from langchain_groq import ChatGroq
from langchain_cohere import ChatCohere
from ..config import GROQ_API_KEY, COHERE_API_KEY

llm_groq = ChatGroq(model="llama-3.3-70b-versatile", api_key=GROQ_API_KEY)
llm_cohere = ChatCohere(model="command-r-plus-08-2024", api_key=COHERE_API_KEY)
