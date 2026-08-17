from langchain_huggingface import HuggingFaceEndpointEmbeddings
import time
import os
from langchain_chroma import Chroma
from ..config import EMBED_TOKEN, CHROMA_COLLECTION, CHROMA_PERSIST_DIR
from .text_extraction import todos_documentos

embed_model = HuggingFaceEndpointEmbeddings(
    model="intfloat/multilingual-e5-large",
    huggingfacehub_api_token=EMBED_TOKEN,
)


def indexar_em_lotes_com_retry(documentos, embed_model, persist_dir, collection_name, tamanho_lote=20, pausa=1.0, tentativas=3):
    vector_store = None
    for i in range(0, len(documentos), tamanho_lote):
        lote = documentos[i:i + tamanho_lote]
        for tentativa in range(tentativas):
            try:
                if vector_store is None:
                    vector_store = Chroma.from_documents(
                        documents=lote, embedding=embed_model,
                        persist_directory=persist_dir, collection_name=collection_name,
                    )
                else:
                    vector_store.add_documents(lote)
                print(f"Indexados {min(i + tamanho_lote, len(documentos))}/{len(documentos)}")
                break
            except Exception as e:
                print(f"Falha no lote {i}, tentativa {tentativa + 1}/{tentativas}: {e}")
                time.sleep(pausa * (tentativa + 1))
        else:
            raise RuntimeError(f"Lote {i} falhou após {tentativas} tentativas")
        time.sleep(pausa)
    return vector_store


def carregar_ou_criar_vectorstore(documentos, embed_model, persist_dir, collection_name):
    """
    Carrega o vectorstore existente se o banco de dados já existe.
    Caso contrário, cria um novo banco de dados com os documentos.
    """
    db_exists = os.path.exists(os.path.join(persist_dir, "chroma.sqlite3"))
    
    if db_exists:
        print(f"ChromaDB encontrado em {persist_dir}. Carregando collection '{collection_name}'...")
        try:
            vector_store = Chroma(
                persist_directory=persist_dir,
                collection_name=collection_name,
                embedding_function=embed_model,
            )
            print(f"Collection carregada com sucesso. Total de documentos: {vector_store._collection.count()}")
            return vector_store
        except Exception as e:
            print(f"Erro ao carregar ChromaDB existente: {e}. Recriando...")
    
    print(f"Criando novo ChromaDB em {persist_dir}...")
    return indexar_em_lotes_com_retry(
        documentos,
        embed_model,
        persist_dir=persist_dir,
        collection_name=collection_name,
    )


vector_store = carregar_ou_criar_vectorstore(
    todos_documentos,
    embed_model,
    persist_dir=CHROMA_PERSIST_DIR,
    collection_name=CHROMA_COLLECTION,
)
