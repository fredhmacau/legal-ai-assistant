import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Text, Button, IconButton, Grid } from "@chakra-ui/react";
import {
  MdGavel,
  MdContentCopy,
  MdCheck,
  MdDownload,
  MdShare,
  MdVerified,
  MdSend,
  MdAttachFile,
} from "react-icons/md";
import ChatInput from "../components/ChatInput";

// Sample AI response data
const sampleResponse = {
  title: "FUNDAMENTAÇÃO JURÍDICA",
  subtitle: "Resposta Gerada por IA Legal v4.2",
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
      gap="8px"
      fontFamily="'JetBrains Mono', monospace"
      fontSize="12px"
      fontWeight="500"
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

export default function ChatPage() {
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
        py="16px"
        borderBottom="1px solid rgba(230, 189, 186, 0.1)"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="1280px"
          mx="auto"
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
              fontWeight="500"
              lineHeight="16px"
              letterSpacing="0.05em"
              color="#5c3f3d"
              textTransform="uppercase"
            >
              Sessão Jurídica Ativa
            </Text>
          </Flex>
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
      <Box maxW="1280px" mx="auto" w="100%" px={{ base: "16px", md: "40px" }} py="48px">
        <Flex direction="column" gap="48px">
          {/* User Message */}
          <Flex justifyContent="flex-end" w="100%">
            <Box
              maxW={{ base: "85%", md: "70%" }}
              bg="#191c1d"
              color="white"
              p="24px"
              borderRadius="12px"
              boxShadow="xl"
              transform="rotate(1deg)"
              _hover={{ transform: "rotate(0deg)" }}
              transition="transform 0.5s"
            >
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="12px"
                fontWeight="500"
                lineHeight="16px"
                letterSpacing="0.05em"
                color="#d9dadb"
                mb="8px"
                textTransform="uppercase"
                opacity="0.6"
              >
                Cidadão / Consulta
              </Text>
              <Text
                fontFamily="'Inter', sans-serif"
                fontSize="20px"
                fontWeight="600"
                lineHeight="28px"
                fontStyle="italic"
              >
                &ldquo;{userQuery}&rdquo;
              </Text>
            </Box>
          </Flex>

          {/* AI Response */}
          <Flex justifyContent="flex-start" w="100%">
            <Box
              w={{ base: "100%", lg: "91.66%" }}
              bg="white"
              borderTop="4px solid #a30019"
              boxShadow="0 25px 60px rgba(0,0,0,0.08)"
              position="relative"
              overflow="hidden"
            >
              {/* Subtle Samakaka SVG Accent */}
              <Box
                position="absolute"
                top="0"
                right="0"
                w="128px"
                h="128px"
                opacity="0.05"
                pointerEvents="none"
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <path
                    d="M0 0L100 100M100 0L0 100M50 0V100M0 50H100"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </Box>

              {/* Header */}
              <Flex
                p="24px"
                borderBottom="1px solid rgba(230, 189, 186, 0.1)"
                direction={{ base: "column", md: "row" }}
                alignItems={{ md: "center" }}
                justifyContent="space-between"
                gap="16px"
              >
                <Flex alignItems="center" gap="16px">
                  <Flex
                    w="48px"
                    h="48px"
                    bg="#a30019"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MdGavel size={24} color="white" />
                  </Flex>
                  <Box>
                    <Text
                      fontFamily="'Inter', sans-serif"
                      fontSize="24px"
                      fontWeight="700"
                      lineHeight="32px"
                      color="#191c1d"
                      letterSpacing="-0.01em"
                    >
                      {sampleResponse.title}
                    </Text>
                    <Text
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="12px"
                      fontWeight="500"
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
                        fontSize="12px"
                        fontWeight="500"
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
              <Box p="24px">
                {/* Introduction */}
                <Text
                  fontFamily="'Inter', sans-serif"
                  fontSize="18px"
                  fontWeight="400"
                  lineHeight="32px"
                  color="#191c1d"
                  mb="32px"
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
                  gap="24px"
                  mb="32px"
                >
                  {sampleResponse.cards.map((card) => (
                    <Box
                      key={card.title}
                      p="24px"
                      bg="#edeeef"
                      borderRadius="8px"
                      borderLeft="4px solid"
                      borderLeftColor={card.borderColor}
                    >
                      <Text
                        fontFamily="'Inter', sans-serif"
                        fontSize="18px"
                        fontWeight="600"
                        lineHeight="28px"
                        color="#191c1d"
                        mb="8px"
                      >
                        {card.title}
                      </Text>
                      <Text
                        fontFamily="'Inter', sans-serif"
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="24px"
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
                    fontWeight="500"
                    lineHeight="16px"
                    letterSpacing="0.2em"
                    color="#5c3f3d"
                    textTransform="uppercase"
                    borderBottom="1px solid rgba(230, 189, 186, 0.2)"
                    pb="8px"
                    mb="16px"
                  >
                    Artigos de Referência
                  </Text>

                  <Flex direction="column" gap="16px">
                    {sampleResponse.articles.map((article) => (
                      <Flex
                        key={article.number}
                        bg="white"
                        p="24px"
                        boxShadow="sm"
                        direction={{ base: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems={{ md: "flex-start" }}
                        gap="16px"
                        _hover={{ boxShadow: "md" }}
                        transition="box-shadow 0.2s"
                      >
                        <Box flex="1">
                          <Flex alignItems="center" gap="12px" mb="8px">
                            <Text
                              fontFamily="'Inter', sans-serif"
                              fontSize="20px"
                              fontWeight="600"
                              lineHeight="28px"
                              color="#a30019"
                            >
                              {article.number}
                            </Text>
                            <Box
                              px="8px"
                              py="2px"
                              bg="#f3f4f5"
                            >
                              <Text
                                fontFamily="'JetBrains Mono', monospace"
                                fontSize="12px"
                                fontWeight="500"
                                lineHeight="16px"
                                letterSpacing="0.05em"
                                color="#5c3f3d"
                              >
                                {article.tag}
                              </Text>
                            </Box>
                          </Flex>
                          <Text
                            fontFamily="'Inter', sans-serif"
                            fontSize="16px"
                            fontWeight="400"
                            lineHeight="24px"
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
                p="24px"
                flexWrap="wrap"
                gap="16px"
                alignItems="center"
                borderTop="1px solid rgba(230, 189, 186, 0.1)"
              >
                <Button
                  bg="#725c00"
                  color="white"
                  fontFamily="'Inter', sans-serif"
                  fontSize="20px"
                  fontWeight="600"
                  px="32px"
                  py="24px"
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  _hover={{ brightness: "0.95" }}
                  _active={{ transform: "scale(0.95)" }}
                  transition="all 0.2s"
                  boxShadow="lg"
                  borderRadius="4px"
                >
                  <MdDownload size={24} />
                  BAIXAR LGT COMPLETA
                </Button>

                <Button
                  bg="transparent"
                  color="#191c1d"
                  fontFamily="'Inter', sans-serif"
                  fontSize="20px"
                  fontWeight="600"
                  px="32px"
                  py="24px"
                  display="flex"
                  alignItems="center"
                  gap="12px"
                  border="2px solid #191c1d"
                  _hover={{ bg: "#191c1d", color: "white" }}
                  transition="all 0.2s"
                  borderRadius="4px"
                >
                  <MdShare size={24} />
                  PARTILHAR
                </Button>

                <Flex ml="auto" alignItems="center" gap="8px">
                  <MdVerified size={20} color="#5c3f3d" />
                  <Text
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="12px"
                    fontWeight="500"
                    lineHeight="16px"
                    letterSpacing="0.05em"
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

      {/* Decorative Background Blurs */}
      <Box
        position="fixed"
        top="25%"
        left="-128px"
        w="384px"
        h="384px"
        bg="rgba(163, 0, 25, 0.05)"
        borderRadius="full"
        filter="blur(120px)"
        pointerEvents="none"
        zIndex="-1"
      />
      <Box
        position="fixed"
        bottom="25%"
        right="-128px"
        w="384px"
        h="384px"
        bg="rgba(254, 211, 48, 0.05)"
        borderRadius="full"
        filter="blur(120px)"
        pointerEvents="none"
        zIndex="-1"
      />
    </Box>
  );
}
