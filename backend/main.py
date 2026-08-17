import uuid
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from app.api.chat_router import chat
from app.agent.supervisor import agente

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("legal_ai")

estado_app = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("A carregar o pipeline RAG (vectorstore + BM25)...")
    estado_app["agente"] = agente
    logger.info("Pipeline carregado. Agente pronto.")
    yield
    estado_app.clear()


app = FastAPI(title="Legal AI - Angola", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://legai-ai.surge.sh"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": {"description": "API do agente Legal IA",
    "version": "1.0"}}


@app.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(chat)
