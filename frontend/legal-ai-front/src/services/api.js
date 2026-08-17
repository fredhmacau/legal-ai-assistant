const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");


export async function sendChatMessage(pergunta, sessionId = null) {
  try {
    const payload = {
      pergunta: pergunta.trim(),
    };
    if (sessionId) {
      payload.session_id = sessionId;
    }

    const response = await fetch(`${API_BASE_URL}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMessage = "Erro de comunicação com o agente de IA.";
      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = typeof errorData.detail === "string" 
            ? errorData.detail 
            : JSON.stringify(errorData.detail);
        }
      } catch {
        
        errorMessage = `Erro ${response.status}: ${response.statusText || errorMessage}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      resposta: data.resposta,
      session_id: data.session_id,
    };
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique se o backend está em execução na porta 8000."
      );
    }
    throw error;
  }
}


export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data?.status === "ok";
  } catch {
    return false;
  }
}
