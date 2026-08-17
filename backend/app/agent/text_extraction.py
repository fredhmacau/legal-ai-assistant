import re
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_core.documents import Document

url_constituicao_pdf = "https://plataformacipra.gov.ao/public/ficheiros/arquivos/Gov_AngolaConstitui%C3%A7%C3%A3o190102230948141675284494.pdf"
url_legislacao_pdf = (
    "https://inej.ao/wp-content/uploads/2025/12/LEI-GERAL-DO-TRABALHO.pdf"
)


loader = PyMuPDFLoader(url_constituicao_pdf)
ct_pages = list(loader.lazy_load())
ct_pages_content = "\n".join(p.page_content for p in ct_pages)

loader = PyMuPDFLoader(url_legislacao_pdf)
lgt_pages = list(loader.lazy_load())
lgt_pages_content = "\n".join(p.page_content for p in lgt_pages)


# limpar ruido (cabeçalhos/rodapés específicos de cada diploma)

def limpar_ruido_constituicao(texto: str) -> str:
    texto = re.sub(r"I SÉRIE\s*––?\s*N\.?º\s*\d+.*?\d{4}\s*\d*", "", texto)
    texto = re.sub(r"DIÁRIO DA REPÚBLICA", "", texto)
    texto = re.sub(
        r"\n\s*\d{1,2}\s*\n?\s*(Alterado|Aditado) pelo artigo.*?I Série\.",
        "",
        texto,
        flags=re.DOTALL,
    )
    return texto


def limpar_ruido_lgt(texto: str) -> str:
    texto = re.sub(r"LEI GERAL DO TRABALHO\s*-\s*LEI N\.?º\s*12/2023", "", texto)
    texto = re.sub(
        r"Ministério da Administração Pública,\s*Trabalho e Segurança Social", "", texto
    )
    texto = re.sub(
        r"^\d{1,3}\s*$", "", texto, flags=re.MULTILINE
    )
    return texto


# corrigir hifinização (palavras partidas por justificação de PDF)

def corrigir_hifenizacao(texto: str) -> str:
    """
    Junta palavras partidas por justificação: hífen (com/sem espaço antes)
    + quebra de linha + continuação em minúscula.
    Não mexe em hífens reais (Vice-Presidente), pois aí a letra seguinte é maiúscula.
    """
    return re.sub(r"(\w)\s*-\s*\n\s*([a-zà-ÿ])", r"\1\2", texto)


# extrair artigos
PADRAO_ARTIGO = re.compile(r"(?=\bARTIGO\s+\d+\.?º(?:-[A-Z])?)")


def extrair_artigos(texto: str, fonte: str) -> list[dict]:
    """
    texto: já deve vir limpo (ruído removido + hifenização corrigida)
    fonte: "Constituição" ou "Lei geral do trabalho"
    """
    partes = PADRAO_ARTIGO.split(texto)
    artigos_raw = partes[1:]

    padrao_cabecalho = re.compile(
        r"ARTIGO\s+(\d+\.?º(?:-[A-Z])?)\s*\d{0,2}\s*\n?\s*\(([^)]+)\)\s*\n?(.*)",
        re.DOTALL,
    )

    artigos = []
    for bloco in artigos_raw:
        match = padrao_cabecalho.match(bloco.strip())
        if match:
            numero, epigrafe, corpo = match.groups()
        else:
            numero_match = re.match(r"ARTIGO\s+(\d+\.?º(?:-[A-Z])?)", bloco)
            numero = numero_match.group(1) if numero_match else "?"
            epigrafe = ""
            corpo = bloco
        artigos.append(
            {
                "fonte": fonte,
                "artigo": numero.strip(),
                "epigrafe": epigrafe.strip(),
                "texto": corpo.strip(),
            }
        )
    return artigos

# cortar anexos
def cortar_apendices_constituicao(artigos: list) -> list:
    if not artigos:
        return artigos
    ultimo = artigos[-1]
    match = re.search(r"\nANEXO\s+I\b", ultimo["texto"])
    if match:
        ultimo["texto"] = ultimo["texto"][: match.start()].strip()
    artigos[-1] = ultimo
    return artigos


# corte da lei de revisão (constituição da republica)
def isolar_texto_republicado(texto: str) -> str:
    match = re.search(r"CONSTITUIÇÃO\s+DA REPÚBLICA DE ANGOLA\s*\n?\s*Preâmbulo", texto)
    if not match:
        raise ValueError(
            "Marcador de republicação não encontrado  verifica o texto de origem."
        )
    return texto[match.start() :]


# pipeline completo da constituição

texto_ct = limpar_ruido_constituicao(ct_pages_content)
texto_ct = corrigir_hifenizacao(texto_ct)
texto_ct_vigente = isolar_texto_republicado(texto_ct)

artigos_constituicao = extrair_artigos(texto_ct_vigente, "Constituição")
artigos_constituicao = cortar_apendices_constituicao(artigos_constituicao)


# pipeline completo da LGT

texto_lgt = limpar_ruido_lgt(lgt_pages_content)
texto_lgt = corrigir_hifenizacao(texto_lgt)

artigos_lgt = extrair_artigos(texto_lgt, "Lei geral do trabalho")


# converter para document pronto para embeddings
METADATA_VIGENCIA = {
    "Constituição": {
        "vigor_desde": "2021-08-16",
        "diploma_revisor": "Lei n.º 18/21, de 16 de Agosto (Lei de Revisão Constitucional)",
    },
    "Lei geral do trabalho": {
        "vigor_desde": "2024-03-26",  # 90 dias após publicação em 25/12/2023, conforme Artigo 322.º
        "diploma_revisor": "Lei n.º 12/23, de 27 de Dezembro",
    },
}


def preparar_documentos_e5(artigos: list) -> list[Document]:
    documentos = []
    for a in artigos:
        doc_id = f"{a['fonte']}_{a['artigo']}".replace(" ", "_").replace(".º", "")
        vigencia = METADATA_VIGENCIA[a["fonte"]]
        documentos.append(
            Document(
                page_content=f"passage: {a['epigrafe']}\n\n{a['texto']}",
                metadata={
                    "fonte": a["fonte"],
                    "artigo": a["artigo"],
                    "epigrafe": a["epigrafe"],
                    "id": doc_id,
                    "vigor_desde": vigencia["vigor_desde"],
                    "diploma_revisor": vigencia["diploma_revisor"],
                },
                id=doc_id,
            )
        )
    return documentos


docs_constituicao = preparar_documentos_e5(artigos_constituicao)
docs_lgt = preparar_documentos_e5(artigos_lgt)
todos_documentos = docs_constituicao + docs_lgt
