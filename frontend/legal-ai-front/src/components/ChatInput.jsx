import { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, IconButton, Textarea } from "@chakra-ui/react";
import { MdSend, MdAttachFile } from "react-icons/md";

export default function ChatInput({
  onSend,
  placeholder = "Coloque outra questão jurídica...",
  showDisclaimer = true,
  variant = "floating", // "floating" | "inline"
}) {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleSend = () => {
    if (value.trim() && !isSending) {
      setIsSending(true);
      onSend?.(value.trim());
      setTimeout(() => {
        setValue("");
        setIsSending(false);
      }, 300);
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
    bottom: "32px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxW: "800px",
    px: { base: "16px", md: "0" },
    zIndex: "50",
  } : {};

  return (
    <Box {...containerStyles}>
      <Flex
        bg="white"
        boxShadow="0 12px 40px rgba(0,0,0,0.12)"
        p="8px"
        borderRadius="12px"
        alignItems="center"
        gap="4"
        border="2px solid transparent"
        _focusWithin={{ borderColor: "#a30019" }}
        transition="all 0.3s"
      >
        <Flex flex="1" pl="16px">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            bg="transparent"
            border="none"
            outline="none"
            fontFamily="'Inter', sans-serif"
            fontSize="16px"
            fontWeight="400"
            lineHeight="24px"
            color="#191c1d"
            minH="56px"
            maxH="200px"
            resize="none"
            rows={1}
            _placeholder={{ color: "rgba(93, 63, 61, 0.4)" }}
            _focus={{ boxShadow: "none", outline: "none" }}
          />
        </Flex>
        <Flex alignItems="center" gap="2" pr="8px">
          <IconButton
            aria-label="Attach file"
            variant="ghost"
            color="#5c3f3d"
            _hover={{ color: "#a30019" }}
            transition="color 0.2s"
            size="md"
          >
            <MdAttachFile size={24} />
          </IconButton>
          <IconButton
            aria-label="Send message"
            onClick={handleSend}
            bg="#fed330"
            color="#231b00"
            w="48px"
            h="48px"
            borderRadius="8px"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            transition="transform 0.2s"
            disabled={isSending || !value.trim()}
          >
            <MdSend size={24} />
          </IconButton>
        </Flex>
      </Flex>

      {/* Disclaimer */}
      {showDisclaimer && (
        <Box textAlign="center" mt="16px">
          <Text
            fontFamily="'JetBrains Mono', monospace"
            fontSize="12px"
            fontWeight="500"
            lineHeight="16px"
            letterSpacing="0.05em"
            color="rgba(92, 63, 61, 0.6)"
            textTransform="uppercase"
          >
            A IA pode cometer erros. Consulte sempre um advogado para decisões críticas.
          </Text>
        </Box>
      )}
    </Box>
  );
}
