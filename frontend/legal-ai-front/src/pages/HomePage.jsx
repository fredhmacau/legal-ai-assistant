import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text, Button, Textarea, IconButton } from "@chakra-ui/react";
import {
  MdVerifiedUser,
  MdGavel,
  MdDescription,
  MdAccountBalance,
  MdSend,
  MdAttachFile,
  MdPictureAsPdf,
} from "react-icons/md";

const quickChips = [
  { icon: MdGavel, label: "Direitos do Trabalhador" },
  { icon: MdDescription, label: "Período Experimental (LGT)" },
  { icon: MdAccountBalance, label: "Constituição Angolana" },
];

export default function HomePage({ onOpenPdfModal }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [query]);

  const handleSend = () => {
    if (query.trim() && !isSending) {
      setIsSending(true);
      setTimeout(() => {
        navigate("/chat", { state: { query: query.trim() } });
      }, 300);
    }
  };

  const handleChipClick = (label) => {
    navigate("/chat", { state: { query: label } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      className="bg-samakaka"
      minH="100vh"
      pt="64px"
      position="relative"
      overflow="hidden"
    >
      {/* Decorative Background Elements */}
      <Box position="fixed" inset="0" pointerEvents="none" overflow="hidden" zIndex="0">
        <Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="40%"
          h="60%"
          bg="rgba(163, 0, 25, 0.05)"
          borderRadius="full"
          filter="blur(120px)"
          className="animate-pulse-subtle"
        />
        <Box
          position="absolute"
          bottom="-15%"
          left="-10%"
          w="50%"
          h="70%"
          bg="rgba(254, 211, 48, 0.1)"
          borderRadius="full"
          filter="blur(150px)"
        />
        {/* Samakaka gradient accent */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="2px"
          bgGradient="to-r"
          gradientFrom="#a30019"
          gradientVia="#fed330"
          gradientTo="#a30019"
          opacity="0.3"
        />
      </Box>

      {/* Main Hero Content */}
      <Flex
        position="relative"
        zIndex="10"
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="calc(100vh - 128px)"
        px={{ base: "16px", md: "40px" }}
        py={{ base: "32px", md: "48px" }}
        maxW="1280px"
        mx="auto"
        w="100%"
      >
        {/* Logo Icon */}
        <Box
          mb={{ base: "24px", md: "40px" }}
          transition="transform 0.7s ease-out"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Box
            w={{ base: "80px", md: "112px" }}
            h={{ base: "80px", md: "112px" }}
            bg="#ce1126"
            borderRadius="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 20px 50px rgba(163, 0, 25, 0.3)"
          >
            <Text
              color="white"
              fontFamily="'Montserrat', sans-serif"
              fontSize={{ base: "44px", md: "60px" }}
              fontWeight="800"
              lineHeight="1"
            >
              K
            </Text>
          </Box>
        </Box>

        {/* Welcome Headlines */}
        <Box textAlign="center" maxW="768px" mb={{ base: "28px", md: "40px" }}>
          {/* Badge */}
          <Flex
            display="inline-flex"
            alignItems="center"
            gap="8px"
            mb="20px"
            px="16px"
            py="6px"
            borderRadius="full"
            bg="#e7e8e9"
            border="1px solid rgba(230, 189, 186, 0.3)"
          >
            <MdVerifiedUser size={16} color="#a30019" />
            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12px"
              fontWeight="600"
              lineHeight="16px"
              letterSpacing="0.05em"
              color="#5c3f3d"
              textTransform="uppercase"
            >
              Inteligência Jurídica Certificada
            </Text>
          </Flex>

          {/* Headline */}
          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize={{ base: "26px", sm: "32px", md: "42px" }}
            fontWeight="800"
            lineHeight={{ base: "1.25", md: "1.2" }}
            letterSpacing="-0.02em"
            color="#191c1d"
            mb="16px"
          >
            Olá! Como posso ajudar com suas{" "}
            <Text as="span" color="#a30019">
              dúvidas jurídicas
            </Text>{" "}
            hoje?
          </Text>

          {/* Subtitle */}
          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize={{ base: "15px", md: "18px" }}
            fontWeight="400"
            lineHeight="1.6"
            color="#5c3f3d"
          >
            Especialista na{" "}
            <Text as="span" fontWeight="700" color="#191c1d">
              Constituição de Angola
            </Text>{" "}
            e na{" "}
            <Text as="span" fontWeight="700" color="#191c1d">
              Lei Geral do Trabalho
            </Text>
            .
          </Text>
        </Box>

        {/* Centralized Chat Input */}
        <Box w="100%" maxW="860px">
          <Flex
            position="relative"
            alignItems="flex-end"
            bg="white"
            boxShadow="0 20px 60px rgba(0,0,0,0.08)"
            borderRadius="16px"
            border="1px solid rgba(230, 189, 186, 0.3)"
            _focusWithin={{ borderColor: "#a30019" }}
            transition="all 0.3s"
            p={{ base: "8px", md: "12px" }}
          >
            <IconButton
              aria-label="Anexar ficheiro"
              variant="ghost"
              color="#5c3f3d"
              _hover={{ color: "#a30019" }}
              transition="color 0.2s"
              size="md"
            >
              <MdAttachFile size={24} />
            </IconButton>
            <Textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Quais são os meus direitos em caso de despedimento sem justa causa?"
              flex="1"
              bg="transparent"
              border="none"
              fontFamily="'Montserrat', sans-serif"
              fontSize={{ base: "15px", md: "16px" }}
              fontWeight="400"
              lineHeight="24px"
              py="12px"
              px="8px"
              minH="56px"
              maxH="200px"
              resize="none"
              rows={1}
              color="#191c1d"
              _placeholder={{ color: "#916f6c" }}
              _focus={{ boxShadow: "none", outline: "none", ring: "none" }}
            />
            <IconButton
              aria-label="Enviar consulta"
              onClick={handleSend}
              bg="#fed330"
              color="#231b00"
              p="16px"
              borderRadius="12px"
              boxShadow="md"
              _hover={{ bg: "#a30019", color: "white" }}
              _active={{ transform: "scale(0.95)" }}
              transition="all 0.3s"
              disabled={isSending || !query.trim()}
              size="lg"
            >
              <MdSend size={24} />
            </IconButton>
          </Flex>

          {/* Quick Action Chips */}
          <Flex
            mt={{ base: "20px", md: "28px" }}
            flexWrap="wrap"
            justifyContent="center"
            gap={{ base: "10px", md: "16px" }}
            className="animate-fade-in"
          >
            {quickChips.map((chip) => (
              <Button
                key={chip.label}
                onClick={() => handleChipClick(chip.label)}
                variant="outline"
                display="flex"
                alignItems="center"
                gap="8px"
                px={{ base: "14px", md: "20px" }}
                py="10px"
                bg="#edeeef"
                border="1px solid rgba(230, 189, 186, 0.3)"
                borderRadius="full"
                color="#5c3f3d"
                fontFamily="'Montserrat', sans-serif"
                fontSize={{ base: "13px", md: "14px" }}
                fontWeight="500"
                _hover={{
                  bg: "#e7e8e9",
                  color: "#191c1d",
                  borderColor: "#a30019",
                }}
                transition="all 0.2s"
              >
                <chip.icon size={18} color="#a30019" />
                {chip.label}
              </Button>
            ))}

            {/* RAG PDF shortcut chip */}
            <Button
              onClick={onOpenPdfModal}
              variant="outline"
              display="flex"
              alignItems="center"
              gap="8px"
              px={{ base: "14px", md: "20px" }}
              py="10px"
              bg="#ffdad7"
              border="1px solid #ce1126"
              borderRadius="full"
              color="#a30019"
              fontFamily="'Montserrat', sans-serif"
              fontSize={{ base: "13px", md: "14px" }}
              fontWeight="600"
              _hover={{
                bg: "#ce1126",
                color: "white",
              }}
              transition="all 0.2s"
            >
              <MdPictureAsPdf size={18} />
              Baixar PDFs da Legislação
            </Button>
          </Flex>
        </Box>

        {/* Vertical decorative text (Desktop only) */}
        <Box
          position="absolute"
          bottom="48px"
          left={{ base: "16px", lg: "40px" }}
          display={{ base: "none", lg: "block" }}
        >
          <Flex
            alignItems="center"
            gap="16px"
            style={{ writingMode: "vertical-rl" }}
            transform="rotate(180deg)"
            opacity="0.35"
            userSelect="none"
          >
            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12px"
              fontWeight="500"
              letterSpacing="0.2em"
              color="#191c1d"
              textTransform="uppercase"
            >
              Justiça & Tecnologia RAG
            </Text>
            <Box h="48px" w="1px" bg="#191c1d" />
            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12px"
              fontWeight="500"
              color="#191c1d"
            >
              v2.0.4
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
