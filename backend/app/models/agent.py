from typing import TypedDict, Annotated
from operator import add
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from pydantic import BaseModel, Field
from agent.llm_providers import llm_groq

class EstadoAgente(TypedDict):
    pergunta_original: str
    pergunta_contextualizada: str
    historico: Annotated[
        list[BaseMessage], add
    ]
    sub_perguntas: list[str]
    documentos_recuperados: Annotated[list, add]
    avaliacao: str
    justificativa_avaliacao: str
    tentativas_recuperacao: int
    resposta_final: str


class PerguntaContextualizada(BaseModel):
    pergunta_autonoma: str = Field(
        description="A pergunta reescrita de forma autónoma, incorporando o contexto necessário do histórico. "
        "Se a pergunta já for autónoma, devolve-a tal como está."
    )


def contextualizar_pergunta(estado: EstadoAgente) -> dict:
    if not estado.get("historico"):
        return {"pergunta_contextualizada": estado["pergunta_original"]}

    llm_estruturado = llm_groq.with_structured_output(PerguntaContextualizada)

    historico_formatado = "\n".join(
        [
            f"{'Utilizador' if isinstance(m, HumanMessage) else 'Agente'}: {m.content}"
            for m in estado["historico"]
        ]
    )

    prompt = f"""Dado o histórico da conversa e a nova pergunta, reescreve a pergunta de forma autónoma, 
                incorporando o contexto necessário (situação laboral já mencionada, factos já dados). 
                Não inventes factos novos, só incorpora o que já foi dito.

                Histórico:
                {historico_formatado}

                Nova pergunta: {estado['pergunta_original']}"""

    resultado = llm_estruturado.invoke(prompt)
    return {"pergunta_contextualizada": resultado.pergunta_autonoma}
