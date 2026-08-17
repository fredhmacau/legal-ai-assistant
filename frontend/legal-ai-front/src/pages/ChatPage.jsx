import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import {
  MdGavel,
  MdContentCopy,
  MdCheck,
  MdDownload,
  MdShare,
  MdVerified,
  MdPictureAsPdf,
  MdRefresh,
  MdErrorOutline,
  MdAdd,
} from "react-icons/md";
import ChatInput from "../components/ChatInput";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { sendChatMessage } from "../services/api";

function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      display="flex"
      alignItems="center"
      gap="6px"
      fontFamily="'JetBrains Mono', monospace"
      fontSize="12px"
      fontWeight="600"
      letterSpacing="0.05em"
      color={copied ? "#16a34a" : "#a30019"}
      _hover={{ bg: "rgba(163, 0, 25, 0.05)" }}
      p="8px"
      transition="color 0.2s"
      size="sm"
    >
      {copied ? <MdCheck size={18} /> : <MdContentCopy size={18} />}
      {copied ? "COPIADO" : "COPIAR"}
    </Button>
  );
}

export default function ChatPage({ onOpenPdfModal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = location.state?.query || "";
  
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasInitializedRef = useRef(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Função principal para enviar pergunta ao backend
  const handleSendMessage = async (perguntaText, currentSessionId = sessionId) => {
    if (!perguntaText || !perguntaText.trim() || isLoading) return;

    const query = perguntaText.trim();
    setError(null);

    // Adiciona a mensagem do usuário
    const userMsgId = `user-${Date.now()}`;
    const userMessage = {
      id: userMsgId,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query, currentSessionId);
      
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: response.resposta,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Erro no chat:", err);
      const errorMsg = err.message || "Ocorreu um erro ao consultar o assistente jurídico.";
      setError({
        message: errorMsg,
        lastQuery: query,
      });
      const errorAiMsg = {
        id: `err-${Date.now()}`,
        role: "error",
        content: errorMsg,
        lastQuery: query,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Tratar envio inicial caso venha da HomePage
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      if (initialQuery) {
        handleSendMessage(initialQuery);
      } else if (messages.length === 0) {
        // Se entrou diretamente em /chat sem query, inicializa com uma saudação/pergunta de exemplo
        const defaultQuery = "Como funciona o período experimental na Lei Geral do Trabalho (LGT)?";
        handleSendMessage(defaultQuery);
      }
    }
  }, [initialQuery]);

  const handleRetry = (lastQuery) => {
    if (lastQuery) {
      // Remove a última mensagem de erro
      setMessages((prev) => prev.filter((m) => m.role !== "error"));
      handleSendMessage(lastQuery);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    setError(null);
    navigate("/");
  };

  const handleShare = async (text) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Legal AI - Consulta Jurídica Angola",
          text: text,
        });
      } catch {
        // Ignorar cancelamento
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Resposta copiada para a área de transferência!");
    }
  };

  return (
    <Box className="bg-samakaka" minH="100vh" pt="64px" pb="160px">
      {/* Status Bar */}
      <Box
        position="sticky"
        top="64px"
        zIndex="40"
        bg="rgba(248, 249, 250, 0.9)"
        backdropFilter="blur(12px)"
        px={{ base: "16px", md: "40px" }}
        py="12px"
        borderBottom="1px solid rgba(230, 189, 186, 0.2)"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="1280px"
          mx="auto"
          flexWrap="wrap"
          gap="12px"
        >
          <Flex alignItems="center" gap="12px">
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg={isLoading ? "#fed330" : "#a30019"}
              className="animate-pulse-subtle"
            />
            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12px"
              fontWeight="600"
              lineHeight="16px"
              letterSpacing="0.05em"
              color="#5c3f3d"
              textTransform="uppercase"
            >
              {isLoading ? "A Consultar RAG..." : "Sessão Jurídica Ativa"}
            </Text>
          </Flex>

          <Flex alignItems="center" gap="10px">
            <Button
              onClick={handleNewChat}
              size="xs"
              variant="outline"
              borderColor="rgba(230, 189, 186, 0.6)"
              color="#5c3f3d"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="600"
              gap="4px"
              _hover={{ bg: "#edeeef", borderColor: "#a30019" }}
            >
              <MdAdd size={14} /> Nova Consulta
            </Button>

            <Button
              onClick={onOpenPdfModal}
              size="xs"
              variant="outline"
              borderColor="#a30019"
              color="#a30019"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="600"
              gap="4px"
              _hover={{ bg: "#ffdad7" }}
            >
              <MdPictureAsPdf size={14} /> PDF RAG
            </Button>

            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="11px"
              fontWeight="500"
              lineHeight="16px"
              letterSpacing="0.05em"
              color="#5c3f3d"
              textTransform="uppercase"
              display={{ base: "none", sm: "block" }}
            >
              ID: {sessionId ? sessionId.slice(0, 8).toUpperCase() : "ANG-LGT"}
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* Chat Content */}
      <Box maxW="1280px" mx="auto" w="100%" px={{ base: "16px", md: "40px" }} py={{ base: "24px", md: "48px" }}>
        <Flex direction="column" gap={{ base: "24px", md: "36px" }}>
          {messages.map((msg) => {
            if (msg.role === "user") {
              return (
                <Flex key={msg.id} justifyContent="flex-end" w="100%">
                  <Box
                    maxW={{ base: "92%", md: "75%" }}
                    bg="#191c1d"
                    color="white"
                    p={{ base: "16px", md: "24px" }}
                    borderRadius="16px"
                    boxShadow="xl"
                  >
                    <Flex justifyContent="space-between" alignItems="center" mb="8px">
                      <Text
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="11px"
                        fontWeight="500"
                        lineHeight="16px"
                        letterSpacing="0.05em"
                        color="#d9dadb"
                        textTransform="uppercase"
                        opacity="0.7"
                      >
                        Cidadão / Consulta
                      </Text>
                      {msg.timestamp && (
                        <Text
                          fontFamily="'JetBrains Mono', monospace"
                          fontSize="10px"
                          color="#a5a7a8"
                        >
                          {msg.timestamp}
                        </Text>
                      )}
                    </Flex>
                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontSize={{ base: "15px", md: "18px" }}
                      fontWeight="600"
                      lineHeight="1.5"
                      fontStyle="italic"
                    >
                      &ldquo;{msg.content}&rdquo;
                    </Text>
                  </Box>
                </Flex>
              );
            }

            if (msg.role === "error") {
              return (
                <Flex key={msg.id} justifyContent="flex-start" w="100%">
                  <Box
                    w="100%"
                    maxW="860px"
                    bg="#fff5f5"
                    border="1px solid #feb2b2"
                    borderLeft="4px solid #ce1126"
                    borderRadius="8px"
                    p="20px"
                    boxShadow="md"
                  >
                    <Flex alignItems="center" gap="10px" mb="8px">
                      <MdErrorOutline size={22} color="#ce1126" />
                      <Text
                        fontFamily="'Montserrat', sans-serif"
                        fontSize="16px"
                        fontWeight="700"
                        color="#ce1126"
                      >
                        Falha na consulta jurídica
                      </Text>
                    </Flex>
                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="14px"
                      color="#742a2a"
                      mb="16px"
                    >
                      {msg.content}
                    </Text>
                    {msg.lastQuery && (
                      <Button
                        onClick={() => handleRetry(msg.lastQuery)}
                        size="sm"
                        bg="#ce1126"
                        color="white"
                        fontFamily="'Montserrat', sans-serif"
                        fontWeight="600"
                        gap="6px"
                        _hover={{ bg: "#a30019" }}
                      >
                        <MdRefresh size={16} /> Tentar Novamente
                      </Button>
                    )}
                  </Box>
                </Flex>
              );
            }

            // Resposta da IA (role === "assistant")
            return (
              <Flex key={msg.id} justifyContent="flex-start" w="100%">
                <Box
                  w="100%"
                  bg="white"
                  borderTop="4px solid #a30019"
                  borderRadius="0 0 16px 16px"
                  boxShadow="0 25px 60px rgba(0,0,0,0.08)"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Header */}
                  <Flex
                    p={{ base: "16px", md: "24px" }}
                    borderBottom="1px solid rgba(230, 189, 186, 0.2)"
                    direction={{ base: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                    justifyContent="space-between"
                    gap="16px"
                  >
                    <Flex alignItems="center" gap="16px">
                      <Flex
                        w="48px"
                        h="48px"
                        minW="48px"
                        bg="#a30019"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="8px"
                      >
                        <MdGavel size={24} color="white" />
                      </Flex>
                      <Box>
                        <Text
                          fontFamily="'Montserrat', sans-serif"
                          fontSize={{ base: "18px", md: "22px" }}
                          fontWeight="700"
                          lineHeight="1.2"
                          color="#191c1d"
                          letterSpacing="-0.01em"
                        >
                          FUNDAMENTAÇÃO JURÍDICA
                        </Text>
                        <Text
                          fontFamily="'JetBrains Mono', monospace"
                          fontSize="12px"
                          fontWeight="600"
                          lineHeight="16px"
                          letterSpacing="0.05em"
                          color="#a30019"
                          textTransform="uppercase"
                        >
                          Resposta Gerada por IA Legal RAG
                        </Text>
                      </Box>
                    </Flex>
                    <Flex gap="8px" alignItems="center">
                      <CopyButton textToCopy={msg.content} />
                    </Flex>
                  </Flex>

                  {/* Main Content Rendered */}
                  <Box p={{ base: "16px", md: "24px" }}>
                    <MarkdownRenderer content={msg.content} />
                  </Box>

                  {/* Action Footer */}
                  <Flex
                    bg="#f3f4f5"
                    p={{ base: "16px", md: "24px" }}
                    flexWrap="wrap"
                    gap="12px"
                    alignItems="center"
                    borderTop="1px solid rgba(230, 189, 186, 0.2)"
                  >
                    <Button
                      onClick={onOpenPdfModal}
                      bg="#725c00"
                      color="white"
                      fontFamily="'Montserrat', sans-serif"
                      fontSize={{ base: "13px", md: "15px" }}
                      fontWeight="700"
                      px={{ base: "14px", md: "20px" }}
                      py={{ base: "12px", md: "16px" }}
                      display="flex"
                      alignItems="center"
                      gap="8px"
                      _hover={{ bg: "#564500" }}
                      _active={{ transform: "scale(0.98)" }}
                      transition="all 0.2s"
                      borderRadius="8px"
                    >
                      <MdDownload size={18} />
                      BAIXAR LEGISLAÇÃO RAG (PDF)
                    </Button>

                    <Button
                      onClick={() => handleShare(msg.content)}
                      bg="transparent"
                      color="#191c1d"
                      fontFamily="'Montserrat', sans-serif"
                      fontSize={{ base: "13px", md: "15px" }}
                      fontWeight="600"
                      px={{ base: "14px", md: "20px" }}
                      py={{ base: "12px", md: "16px" }}
                      display="flex"
                      alignItems="center"
                      gap="8px"
                      border="2px solid #191c1d"
                      _hover={{ bg: "#191c1d", color: "white" }}
                      transition="all 0.2s"
                      borderRadius="8px"
                    >
                      <MdShare size={18} />
                      PARTILHAR
                    </Button>

                    <Flex ml={{ base: "0", md: "auto" }} alignItems="center" gap="8px">
                      <MdVerified size={18} color="#5c3f3d" />
                      <Text
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="11px"
                        fontWeight="600"
                        color="#5c3f3d"
                      >
                        VALIDADO PELO MINPRESI
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            );
          })}

          {/* Loading / Thinking State */}
          {isLoading && (
            <Flex justifyContent="flex-start" w="100%">
              <Box
                w="100%"
                bg="white"
                borderTop="4px solid #fed330"
                borderRadius="0 0 16px 16px"
                boxShadow="0 15px 40px rgba(0,0,0,0.06)"
                p={{ base: "20px", md: "32px" }}
              >
                <Flex alignItems="center" gap="16px">
                  <Spinner size="md" color="#a30019" />
                  <Box>
                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="16px"
                      fontWeight="700"
                      color="#191c1d"
                    >
                      A consultar a legislação angolana...
                    </Text>
                    <Text
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="12px"
                      color="#5c3f3d"
                    >
                      Vectorstore + BM25 &bull; Avaliação e Síntese de Artigos
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          )}

          <div ref={messagesEndRef} />
        </Flex>
      </Box>

      {/* Persistent Chat Input */}
      <ChatInput
        onSend={(msg) => handleSendMessage(msg)}
        isLoading={isLoading}
        variant="floating"
      />
    </Box>
  );
}
