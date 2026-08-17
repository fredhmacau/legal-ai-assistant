import uuid
import logging
from fastapi import APIRouter, HTTPException
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel, Field
from ..agent.supervisor import agente

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("legal_ai")
chat = APIRouter(prefix="/v1")


class PedidoChat(BaseModel):
    pergunta: str = Field(..., min_length=1, max_length=2000)
    session_id: str | None = None


class RespostaChat(BaseModel):
    resposta: str
    session_id: str





@chat.post("/chat", response_model=RespostaChat)
async def handle_chat(pedido: PedidoChat):
    session_id = pedido.session_id or str(uuid.uuid4())
    config = {"configurable": {"thread_id": session_id}}
  

    try:
        resultado = await run_in_threadpool(
            agente.invoke,
            {
                "pergunta_original": pedido.pergunta,
                "pergunta_contextualizada": "",
                "sub_perguntas": [], "documentos_recuperados": [], "avaliacao": "",
                "justificativa_avaliacao": "", "tentativas_recuperacao": 0, "resposta_final": "",
            },
            config=config,
        )
    except Exception:
        logger.exception("Erro ao processar pedido de chat")
        raise HTTPException(status_code=500, detail="Erro ao processar a pergunta. Tenta novamente.")

    return RespostaChat(resposta=resultado["resposta_final"], session_id=session_id)