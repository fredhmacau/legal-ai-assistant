import { Box, Text, Flex } from "@chakra-ui/react";
import { MdMenuBook, MdLightbulbOutline, MdGavel } from "react-icons/md";


function renderInlineFormatting(text) {
  if (!text) return null;
  
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text
          as="strong"
          key={index}
          fontWeight="700"
          color="#191c1d"
        >
          {part.slice(2, -2)}
        </Text>
      );
    }
    return part;
  });
}


export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  
  const lines = content.split("\n");
  const sections = [];
  let currentSection = { type: "body", title: "", items: [] };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      if (currentSection.items.length > 0 || currentSection.title) {
        sections.push(currentSection);
      }
      const title = trimmed.replace(/^#+\s*/, "");
      let type = "section";
      const lower = title.toLowerCase();
      if (lower.includes("fonte") || lower.includes("artigo") || lower.includes("legislaç")) {
        type = "sources";
      } else if (lower.includes("recomenda") || lower.includes("conclusão") || lower.includes("aviso")) {
        type = "recommendation";
      } else if (lower.includes("resposta") || lower.includes("fundamenta")) {
        type = "response";
      }
      currentSection = { type, title, items: [] };
    } else if (trimmed.length > 0) {
      currentSection.items.push(trimmed);
    } else {
      if (currentSection.items.length > 0 && currentSection.items[currentSection.items.length - 1] !== "") {
        currentSection.items.push(""); // separador de parágrafos
      }
    }
  }
  if (currentSection.items.length > 0 || currentSection.title) {
    sections.push(currentSection);
  }

  
  if (sections.length === 1 && sections[0].type === "body" && !sections[0].title) {
    return (
      <Box fontSize={{ base: "15px", md: "16px" }} lineHeight="1.7" color="#191c1d">
        {content.split("\n\n").map((para, pIdx) => (
          <Text key={pIdx} mb="16px">
            {renderInlineFormatting(para)}
          </Text>
        ))}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      {sections.map((sec, idx) => {
        if (sec.type === "sources") {
          return (
            <Box
              key={idx}
              bg="#f8f9fa"
              border="1px solid #e7e8e9"
              borderLeft="4px solid #a30019"
              borderRadius="8px"
              p={{ base: "16px", md: "20px" }}
            >
              <Flex alignItems="center" gap="8px" mb="12px">
                <MdMenuBook size={20} color="#a30019" />
                <Text
                  fontFamily="'Montserrat', sans-serif"
                  fontSize="16px"
                  fontWeight="700"
                  color="#a30019"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  {sec.title || "Fontes Utilizadas"}
                </Text>
              </Flex>
              <Flex direction="column" gap="8px">
                {sec.items.filter(Boolean).map((item, itemIdx) => {
                  const cleaned = item.replace(/^[-*•]\s*/, "");
                  return (
                    <Flex
                      key={itemIdx}
                      alignItems="flex-start"
                      gap="8px"
                      p="8px 12px"
                      bg="white"
                      borderRadius="6px"
                      border="1px solid #eef0f2"
                    >
                      <MdGavel size={16} color="#725c00" style={{ marginTop: "3px", flexShrink: 0 }} />
                      <Text
                        fontFamily="'Montserrat', sans-serif"
                        fontSize="14px"
                        lineHeight="1.5"
                        color="#191c1d"
                      >
                        {renderInlineFormatting(cleaned)}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          );
        }

        if (sec.type === "recommendation") {
          return (
            <Box
              key={idx}
              bg="rgba(254, 211, 48, 0.12)"
              border="1px solid rgba(254, 211, 48, 0.4)"
              borderLeft="4px solid #fed330"
              borderRadius="8px"
              p={{ base: "16px", md: "20px" }}
            >
              <Flex alignItems="center" gap="8px" mb="8px">
                <MdLightbulbOutline size={20} color="#725c00" />
                <Text
                  fontFamily="'Montserrat', sans-serif"
                  fontSize="15px"
                  fontWeight="700"
                  color="#725c00"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  {sec.title || "Recomendação Prática"}
                </Text>
              </Flex>
              <Box>
                {sec.items.filter(Boolean).map((item, itemIdx) => (
                  <Text
                    key={itemIdx}
                    fontFamily="'Montserrat', sans-serif"
                    fontSize="14px"
                    lineHeight="1.6"
                    color="#3c2f00"
                    mb={itemIdx < sec.items.length - 1 ? "8px" : "0"}
                  >
                    {renderInlineFormatting(item.replace(/^[-*•]\s*/, ""))}
                  </Text>
                ))}
              </Box>
            </Box>
          );
        }

        // Resposta padrão ou seção genérica
        return (
          <Box key={idx}>
            {sec.title && sec.type !== "response" && (
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="18px"
                fontWeight="700"
                color="#191c1d"
                mb="12px"
              >
                {sec.title}
              </Text>
            )}
            <Box display="flex" flexDirection="column" gap="12px">
              {sec.items.map((item, itemIdx) => {
                if (!item) return <Box key={itemIdx} h="4px" />;
                if (item.startsWith("- ") || item.startsWith("* ") || item.startsWith("• ")) {
                  return (
                    <Flex key={itemIdx} alignItems="flex-start" gap="8px" pl="4px">
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg="#a30019"
                        mt="8px"
                        flexShrink={0}
                      />
                      <Text
                        fontFamily="'Montserrat', sans-serif"
                        fontSize={{ base: "15px", md: "16px" }}
                        lineHeight="1.6"
                        color="#191c1d"
                      >
                        {renderInlineFormatting(item.replace(/^[-*•]\s*/, ""))}
                      </Text>
                    </Flex>
                  );
                }
                return (
                  <Text
                    key={itemIdx}
                    fontFamily="'Montserrat', sans-serif"
                    fontSize={{ base: "15px", md: "16px" }}
                    lineHeight="1.7"
                    color="#191c1d"
                  >
                    {renderInlineFormatting(item)}
                  </Text>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
