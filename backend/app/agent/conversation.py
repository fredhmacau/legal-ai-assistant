from supervisor import agente

def conversar(pergunta: str, session_id: str) -> str:
    config = {"configurable": {"thread_id": session_id}}

    resultado = agente.invoke({
        "pergunta_original": pergunta,
        "pergunta_contextualizada": "",
        "sub_perguntas": [], "documentos_recuperados": [], "avaliacao": "",
        "justificativa_avaliacao": "", "tentativas_recuperacao": 0, "resposta_final": "",
    }, config=config)

    return resultado["resposta_final"]