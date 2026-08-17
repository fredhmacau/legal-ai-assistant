import os
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.environ["HUGGINGFACEHUB_API_TOKEN"]
GROQ_API_KEY = os.environ["GROQ_API_KEY"]
CHROMA_PERSIST_DIR = os.environ.get("CHROMA_PERSIST_DIR", "./chroma_legal_ai")
CHROMA_COLLECTION = os.environ.get("CHROMA_COLLECTION", "legislacao_angola")
COHERE_API_KEY = os.environ["COHERE_API_KEY"]
EMBED_TOKEN = os.environ["EMBED_TOKEN"]
