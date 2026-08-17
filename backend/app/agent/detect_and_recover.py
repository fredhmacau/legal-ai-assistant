from .exact_recovery import buscar_bm25, reciprocal_rank_fusion
import re
from .text_extraction import todos_documentos
from .embedding import vector_store

def detectar_artigo_explicito(pergunta: str) -> str | None:
    match = re.search(r'artigo\s+(\d+)', pergunta.lower())
    return match.group(1) if match else None

def recuperacao_hibrida(pergunta: str, k_final: int = 5, k_candidatos: int = 10) -> list:
    numero_artigo = detectar_artigo_explicito(pergunta)
    if numero_artigo:
        match_directo = [
            doc for doc in todos_documentos
            if doc.metadata["artigo"].rstrip(".º") == numero_artigo
        ]
        if match_directo:
            return match_directo[:k_final]

    resultados_semanticos = vector_store.similarity_search(f"query: {pergunta}", k=k_candidatos)
    resultados_bm25 = buscar_bm25(pergunta, k=k_candidatos)
    return reciprocal_rank_fusion(resultados_semanticos, resultados_bm25)[:k_final]