from langchain_groq import ChatGroq
from langchain_cohere import ChatCohere

llm_groq = ChatGroq(model="llama-3.3-70b-versatile")
llm_cohere = ChatCohere(model="command-r-plus-08-2024")


