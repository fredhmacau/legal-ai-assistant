from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from models.agent import EstadoAgente
from models.context import contextualizar_pergunta, decompor_pergunta, recuperar
from models.assessment_recovery import sintetizar, auto_criticar


checkpointer = MemorySaver()
def decidir_proximo_passo(estado: EstadoAgente) -> str:
    if estado["avaliacao"] == "suficiente" or estado["tentativas_recuperacao"] >= 2:
        return "sintetizar"
    return "recuperar"

checkpointer = MemorySaver()

grafo = StateGraph(EstadoAgente)

grafo.add_node("contextualizar", contextualizar_pergunta)
grafo.add_node("decompor", decompor_pergunta)
grafo.add_node("recuperar", recuperar)
grafo.add_node("auto_criticar", auto_criticar)
grafo.add_node("sintetizar", sintetizar)

grafo.set_entry_point("contextualizar")
grafo.add_edge("contextualizar", "decompor")
grafo.add_edge("decompor", "recuperar")
grafo.add_edge("recuperar", "auto_criticar")
grafo.add_conditional_edges("auto_criticar", decidir_proximo_passo, {
    "recuperar": "recuperar",
    "sintetizar": "sintetizar",
})
grafo.add_edge("sintetizar", END)

agente = grafo.compile(checkpointer=checkpointer)