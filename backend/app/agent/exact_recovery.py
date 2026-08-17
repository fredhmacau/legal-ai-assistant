from rank_bm25 import BM25Okapi
import re
from .text_extraction import todos_documentos

def tokenizar_pt(texto: str) -> list[str]:
    """
    Tokenização simples para português jurídico: minúsculas, remove pontuação,
    mas preserva números de artigo (ex: '35.º' -> mantém '35' e 'º' juntos é ok perder,
    o número em si é o que importa para correspondência exacta).
    """
    texto = texto.lower()
    texto = re.sub(r"[^\w\sáàâãéêíóôõúçü]", " ", texto)
    return texto.split()


# sentido para correspondência de palavras-chave
corpus_bm25 = [
    f"{doc.metadata['epigrafe']} {doc.metadata['artigo']} {doc.page_content.replace('passage: ', '', 1)}"
    for doc in todos_documentos
]
corpus_tokenizado = [tokenizar_pt(texto) for texto in corpus_bm25]
bm25_index = BM25Okapi(corpus_tokenizado)

doc_por_id = {doc.metadata["id"]: doc for doc in todos_documentos}


def buscar_bm25(query: str, k: int = 5) -> list[tuple[int, float]]:
    """Retorna lista de (índice_no_corpus, score) ordenada por relevância."""
    tokens_query = tokenizar_pt(query)
    scores = bm25_index.get_scores(tokens_query)
    indices_ordenados = sorted(
        range(len(scores)), key=lambda i: scores[i], reverse=True
    )
    return [(i, scores[i]) for i in indices_ordenados[:k]]


def reciprocal_rank_fusion(
    ranking_semantico: list, ranking_bm25: list[tuple[int, float]], k_rrf: int = 60
) -> list:
    scores_combinados = {}

    for posicao, doc in enumerate(ranking_semantico):
        chave = doc.metadata["id"]
        scores_combinados[chave] = scores_combinados.get(chave, 0) + 1 / (
            k_rrf + posicao + 1
        )

    for posicao, (idx, _score) in enumerate(ranking_bm25):
        chave = todos_documentos[idx].metadata["id"]
        scores_combinados[chave] = scores_combinados.get(chave, 0) + 1 / (
            k_rrf + posicao + 1
        )

    resultados_ordenados = sorted(
        scores_combinados.items(), key=lambda x: x[1], reverse=True
    )
    return [doc_por_id[chave] for chave, _ in resultados_ordenados]
