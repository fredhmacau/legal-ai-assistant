from typing import TypedDict, Annotated
from operator import add
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from pydantic import BaseModel, Field
from ..agent.llm_providers import llm_groq, llm_cohere
from .agent import EstadoAgente

class AvaliacaoRecuperacao(BaseModel):
    suficiente: bool = Field(
        description="True se os documentos recuperados permitem responder com precisão à pergunta original."
    )
    justificativa: str = Field(description="Explicação breve da avaliação.")
    sub_perguntas_adicionais: list[str] = Field(
        default_factory=list,
        description="Se insuficiente, novas sub-perguntas reformuladas para tentar recuperar melhor.",
    )


def auto_criticar(estado: EstadoAgente) -> dict:
    llm_estruturado = llm_groq.with_structured_output(AvaliacaoRecuperacao)

    contexto = "\n\n".join(
        [
            f"[{d.metadata['fonte']} - Artigo {d.metadata['artigo']}] {d.metadata['epigrafe']}"
            for d in estado["documentos_recuperados"]
        ]
    )

    prompt = f"""Pergunta original: {estado['pergunta_original']}

                Artigos recuperados (só os títulos, para avaliares cobertura):
                {contexto}

                Estes artigos são suficientes e relevantes para responder com precisão jurídica à pergunta?
                Considera insuficiente se: faltam artigos claramente relevantes, ou os artigos recuperados são genéricos demais."""

    resultado = llm_estruturado.invoke(prompt)
    return {
        "avaliacao": "suficiente" if resultado.suficiente else "insuficiente",
        "justificativa_avaliacao": resultado.justificativa,
        "sub_perguntas": resultado.sub_perguntas_adicionais or estado["sub_perguntas"],
    }


def sintetizar(estado: EstadoAgente) -> dict:
    contexto = "\n\n".join(
        [
            f"[Fonte: {d.metadata['fonte']}, Artigo {d.metadata['artigo']} - {d.metadata['epigrafe']} "
            f"| Vigente desde {d.metadata['vigor_desde']} ({d.metadata['diploma_revisor']})]\n"
            f"{d.page_content.replace('passage: ', '', 1)}"
            for d in estado["documentos_recuperados"]
        ]
    )

    prompt = f"""És um assistente jurídico que ajuda trabalhadores angolanos a entender os seus direitos.
                Responde com base EXCLUSIVAMENTE nos artigos abaixo. Não inventes artigos.

                FORMATO — segue exactamente esta estrutura em Markdown:

                ## Resposta
                [corpo, citando artigos aplicáveis]

                ## Fontes utilizadas
                [lista com marcadores: **[Diploma], Artigo [N.º] — [Epígrafe]** (vigente desde [data])]

                ## Recomendação
                [recomendação breve]

                Se os artigos não cobrirem a pergunta, diz isso na secção "Resposta".

                Pergunta: {estado['pergunta_contextualizada']}

                Artigos disponíveis:
                {contexto}
"""

    resposta = llm_cohere.invoke(prompt)

    return {
        "resposta_final": resposta.content,
        "historico": [
            HumanMessage(content=estado["pergunta_original"]),
            AIMessage(content=resposta.content),
        ],
    }
