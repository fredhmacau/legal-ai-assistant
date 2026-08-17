import { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, IconButton, Textarea, Spinner } from "@chakra-ui/react";
import { MdSend, MdAttachFile } from "react-icons/md";

export default function ChatInput({
  onSend,
  isLoading = false,
  placeholder = "Coloque outra questão jurídica...",
  showDisclaimer = true,
  variant = "floating", // "floating" | "inline"
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      const message = value.trim();
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      onSend?.(message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const containerStyles = variant === "floating" ? {
    position: "fixed",
    bottom: { base: "12px", md: "24px" },
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxW: "840px",
    px: { base: "12px", md: "24px" },
    zIndex: "50",
  } : {};

  return (
    <Box {...containerStyles}>
      <Flex
        bg="white"
        boxShadow="0 12px 40px rgba(0,0,0,0.14)"
        p={{ base: "6px 8px", md: "8px 12px" }}
        borderRadius="14px"
        alignItems="center"
        gap={{ base: "8px", md: "12px" }}
        border="2px solid transparent"
        _focusWithin={{ borderColor: "#a30019" }}
        transition="all 0.3s"
        opacity={isLoading ? 0.9 : 1}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          disabled={isLoading}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "A analisar a legislação angolana..." : placeholder}
          flex="1"
          bg="transparent"
          border="none"
          outline="none"
          fontFamily="'Montserrat', sans-serif"
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="400"
          lineHeight="24px"
          py={{ base: "10px", md: "12px" }}
          pl={{ base: "12px", md: "16px" }}
          pr="8px"
          minH="48px"
          maxH="180px"
          resize="none"
          rows={1}
          color="#191c1d"
          _placeholder={{ color: "rgba(93, 63, 61, 0.4)" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        />
        <IconButton
          aria-label="Enviar mensagem"
          onClick={handleSend}
          bg={isLoading ? "#e7e8e9" : "#fed330"}
          color={isLoading ? "#5c3f3d" : "#231b00"}
          w={{ base: "44px", md: "48px" }}
          h={{ base: "44px", md: "48px" }}
          borderRadius="10px"
          boxShadow="md"
          _hover={!isLoading ? { bg: "#a30019", color: "white" } : {}}
          _active={!isLoading ? { transform: "scale(0.95)" } : {}}
          transition="all 0.2s"
          disabled={isLoading || !value.trim()}
          flexShrink={0}
        >
          {isLoading ? <Spinner size="sm" color="#a30019" /> : <MdSend size={22} />}
        </IconButton>
      </Flex>

      {/* Disclaimer */}
      {showDisclaimer && (
        <Box textAlign="center" mt={{ base: "8px", md: "12px" }}>
          <Text
            fontFamily="'JetBrains Mono', monospace"
            fontSize={{ base: "10px", md: "11px" }}
            fontWeight="500"
            lineHeight="14px"
            letterSpacing="0.05em"
            color="rgba(92, 63, 61, 0.7)"
            
          >
            A IA pode cometer erros. Consulte sempre um advogado para decisões críticas.
          </Text>
        </Box>
      )}
    </Box>
  );
}
