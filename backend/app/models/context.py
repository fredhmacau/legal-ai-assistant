from typing import TypedDict, Annotated
from operator import add
from langchain_core.messages import HumanMessage, AIMessage, BaseMessage
from pydantic import BaseModel, Field
from ..agent.llm_providers import llm_groq
from ..agent.detect_and_recover import recuperacao_hibrida
from .agent import EstadoAgente

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


class SubPerguntas(BaseModel):
    perguntas: list[str] = Field(
        description="Lista de 1 a 3 sub-perguntas simples e independentes, em português, que decompõem a pergunta original."
    )


def decompor_pergunta(estado: EstadoAgente) -> dict:
    llm_estruturado = llm_groq.with_structured_output(SubPerguntas)
    prompt = f"""Decompõe a seguinte situação laboral/jurídica em 1 a 3 sub-perguntas simples e directas...

    Situação: {estado['pergunta_contextualizada']}"""
    resultado = llm_estruturado.invoke(prompt)
    return {"sub_perguntas": resultado.perguntas, "tentativas_recuperacao": 0}


def recuperar(estado: EstadoAgente) -> dict:
    todos_docs = []
    for sub_pergunta in estado["sub_perguntas"]:
        docs = recuperacao_hibrida(sub_pergunta, k_final=4)
        todos_docs.extend(docs)

   
    vistos = set()
    docs_unicos = []
    for doc in todos_docs:
        if doc.metadata["id"] not in vistos:
            vistos.add(doc.metadata["id"])
            docs_unicos.append(doc)

    return {
        "documentos_recuperados": docs_unicos,
        "tentativas_recuperacao": estado["tentativas_recuperacao"] + 1,
    }
