import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Text, Button, Grid } from "@chakra-ui/react";
import {
  MdGavel,
  MdContentCopy,
  MdCheck,
  MdDownload,
  MdShare,
  MdVerified,
  MdPictureAsPdf,
} from "react-icons/md";
import ChatInput from "../components/ChatInput";

// Sample AI response data
const sampleResponse = {
  title: "FUNDAMENTAÇÃO JURÍDICA",
  subtitle: "Resposta Gerada por IA Legal RAG v4.2",
  tags: ["LGT 2024", "DIREITO LABORAL"],
  introduction:
    'O período experimental na República de Angola é regido pela Lei n.º 12/23 (Lei Geral do Trabalho). Este período destina-se à verificação mútua da aptidão do trabalhador e do interesse do empregador.',
  cards: [
    {
      title: "Regra Geral",
      text: "O período experimental padrão é de 60 dias para a maioria dos contratos por tempo indeterminado.",
      highlight: "60 dias",
      borderColor: "#ce1126",
    },
    {
      title: "Cargos Complexos",
      text: "Para funções de elevada complexidade técnica ou cargos de direção, o prazo pode estender-se até 180 dias.",
      highlight: "180 dias",
      borderColor: "#725c00",
    },
  ],
  articles: [
    {
      number: "Artigo 45.º",
      tag: "Duração",
      text: '"Durante o período experimental, qualquer das partes pode denunciar o contrato sem necessidade de pré-aviso, invocação de justa causa ou pagamento de indemnização."',
    },
    {
      number: "Artigo 46.º",
      tag: "Redução e Exclusão",
      text: '"O período experimental pode ser reduzido ou excluído por acordo escrito entre as partes, ou por força de contrato colectivo de trabalho."',
    },
  ],
};

function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
  const userQuery =
    location.state?.query ||
    "Como funciona o período experimental na Lei Geral do Trabalho (LGT)?";

  const handleSend = (message) => {
    console.log("New message:", message);
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
          gap="8px"
        >
          <Flex alignItems="center" gap="12px">
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg="#a30019"
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
              Sessão Jurídica Ativa
            </Text>
          </Flex>

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
            fontSize="12px"
            fontWeight="500"
            lineHeight="16px"
            letterSpacing="0.05em"
            color="#5c3f3d"
            textTransform="uppercase"
          >
            ID: 2948-ANG-LGT
          </Text>
        </Flex>
      </Box>

      {/* Chat Content */}
      <Box maxW="1280px" mx="auto" w="100%" px={{ base: "16px", md: "40px" }} py={{ base: "24px", md: "48px" }}>
        <Flex direction="column" gap={{ base: "24px", md: "48px" }}>
          {/* User Message */}
          <Flex justifyContent="flex-end" w="100%">
            <Box
              maxW={{ base: "92%", md: "75%" }}
              bg="#191c1d"
              color="white"
              p={{ base: "16px", md: "24px" }}
              borderRadius="16px"
              boxShadow="xl"
            >
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="11px"
                fontWeight="500"
                lineHeight="16px"
                letterSpacing="0.05em"
                color="#d9dadb"
                mb="8px"
                textTransform="uppercase"
                opacity="0.7"
              >
                Cidadão / Consulta
              </Text>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight="600"
                lineHeight="1.4"
                fontStyle="italic"
              >
                &ldquo;{userQuery}&rdquo;
              </Text>
            </Box>
          </Flex>

          {/* AI Response */}
          <Flex justifyContent="flex-start" w="100%">
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
                      fontSize={{ base: "20px", md: "24px" }}
                      fontWeight="700"
                      lineHeight="1.2"
                      color="#191c1d"
                      letterSpacing="-0.01em"
                    >
                      {sampleResponse.title}
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
                      {sampleResponse.subtitle}
                    </Text>
                  </Box>
                </Flex>
                <Flex gap="8px" flexWrap="wrap">
                  {sampleResponse.tags.map((tag) => (
                    <Box
                      key={tag}
                      px="12px"
                      py="4px"
                      bg="#e7e8e9"
                      borderRadius="full"
                    >
                      <Text
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="11px"
                        fontWeight="600"
                        lineHeight="16px"
                        letterSpacing="0.05em"
                        color="#5c3f3d"
                      >
                        {tag}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Flex>

              {/* Main Content */}
              <Box p={{ base: "16px", md: "24px" }}>
                {/* Introduction */}
                <Text
                  fontFamily="'Montserrat', sans-serif"
                  fontSize={{ base: "15px", md: "18px" }}
                  fontWeight="400"
                  lineHeight="1.6"
                  color="#191c1d"
                  mb="24px"
                >
                  {sampleResponse.introduction.split("Lei n.º 12/23 (Lei Geral do Trabalho)").map((part, i) =>
                    i === 0 ? (
                      <span key={i}>
                        {part}
                        <Text
                          as="span"
                          fontWeight="700"
                          borderBottom="2px solid #fed330"
                        >
                          Lei n.º 12/23 (Lei Geral do Trabalho)
                        </Text>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </Text>

                {/* Info Cards Grid */}
                <Grid
                  templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                  gap="16px"
                  mb="24px"
                >
                  {sampleResponse.cards.map((card) => (
                    <Box
                      key={card.title}
                      p={{ base: "16px", md: "20px" }}
                      bg="#edeeef"
                      borderRadius="8px"
                      borderLeft="4px solid"
                      borderLeftColor={card.borderColor}
                    >
                      <Text
                        fontFamily="'Montserrat', sans-serif"
                        fontSize="17px"
                        fontWeight="700"
                        lineHeight="24px"
                        color="#191c1d"
                        mb="6px"
                      >
                        {card.title}
                      </Text>
                      <Text
                        fontFamily="'Montserrat', sans-serif"
                        fontSize="14px"
                        fontWeight="400"
                        lineHeight="1.5"
                        color="#5c3f3d"
                      >
                        {card.text.split(card.highlight).map((part, i) =>
                          i === 0 ? (
                            <span key={i}>
                              {part}
                              <Text as="span" fontWeight="700" color="#191c1d">
                                {card.highlight}
                              </Text>
                            </span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </Text>
                    </Box>
                  ))}
                </Grid>

                {/* Articles Reference Section */}
                <Box>
                  <Text
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="12px"
                    fontWeight="600"
                    lineHeight="16px"
                    letterSpacing="0.15em"
                    color="#5c3f3d"
                    textTransform="uppercase"
                    borderBottom="1px solid rgba(230, 189, 186, 0.2)"
                    pb="8px"
                    mb="16px"
                  >
                    Artigos de Referência
                  </Text>

                  <Flex direction="column" gap="12px">
                    {sampleResponse.articles.map((article) => (
                      <Flex
                        key={article.number}
                        bg="#f8f9fa"
                        p={{ base: "16px", md: "20px" }}
                        borderRadius="8px"
                        border="1px solid #e7e8e9"
                        direction={{ base: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ sm: "flex-start" }}
                        gap="12px"
                      >
                        <Box flex="1">
                          <Flex alignItems="center" gap="12px" mb="6px">
                            <Text
                              fontFamily="'Montserrat', sans-serif"
                              fontSize={{ base: "16px", md: "18px" }}
                              fontWeight="700"
                              color="#a30019"
                            >
                              {article.number}
                            </Text>
                            <Box px="8px" py="2px" bg="#e7e8e9" borderRadius="4px">
                              <Text
                                fontFamily="'JetBrains Mono', monospace"
                                fontSize="11px"
                                fontWeight="600"
                                color="#5c3f3d"
                              >
                                {article.tag}
                              </Text>
                            </Box>
                          </Flex>
                          <Text
                            fontFamily="'Montserrat', sans-serif"
                            fontSize="14px"
                            fontWeight="400"
                            lineHeight="1.5"
                            color="#191c1d"
                            fontStyle="italic"
                          >
                            {article.text}
                          </Text>
                        </Box>
                        <CopyButton />
                      </Flex>
                    ))}
                  </Flex>
                </Box>
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
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="700"
                  px={{ base: "16px", md: "24px" }}
                  py={{ base: "16px", md: "20px" }}
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  _hover={{ bg: "#564500" }}
                  _active={{ transform: "scale(0.98)" }}
                  transition="all 0.2s"
                  borderRadius="8px"
                >
                  <MdDownload size={20} />
                  BAIXAR LEGISLAÇÃO RAG (PDF)
                </Button>

                <Button
                  bg="transparent"
                  color="#191c1d"
                  fontFamily="'Montserrat', sans-serif"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="600"
                  px={{ base: "16px", md: "24px" }}
                  py={{ base: "16px", md: "20px" }}
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  border="2px solid #191c1d"
                  _hover={{ bg: "#191c1d", color: "white" }}
                  transition="all 0.2s"
                  borderRadius="8px"
                >
                  <MdShare size={20} />
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
        </Flex>
      </Box>

      {/* Persistent Chat Input */}
      <ChatInput onSend={handleSend} variant="floating" />
    </Box>
  );
}
