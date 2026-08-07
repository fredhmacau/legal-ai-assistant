import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";

export default function Footer({ onOpenPdfModal }) {
  return (
    <Box
      as="footer"
      w="100%"
      bg="#f3f4f5"
      borderTop="1px solid"
      borderColor="rgba(230, 189, 186, 0.3)"
      py={{ base: "32px", md: "48px" }}
    >
      <Box maxW="1280px" mx="auto" px={{ base: "16px", md: "40px" }}>
        {/* Top Row */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: "16px", md: "8px" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Flex alignItems="center" gap="2">
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="20px"
              fontWeight="700"
              lineHeight="28px"
              color="#191c1d"
            >
              Kamba da Lei
            </Text>
            <Box
              px="8px"
              py="2px"
              bg="#e7e8e9"
              borderRadius="4px"
            >
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="12px"
                fontWeight="600"
                lineHeight="16px"
                letterSpacing="0.05em"
                color="#a30019"
              >
                AI LEGAL RAG
              </Text>
            </Box>
          </Flex>
          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize="14px"
            fontWeight="400"
            color="#5c3f3d"
          >
            © 2026 República de Angola. Justiça, Transparência e Eficiência.
          </Text>
        </Flex>

        {/* Links Row */}
        <Flex
          mt="24px"
          pt="24px"
          borderTop="1px solid"
          borderColor="rgba(230, 189, 186, 0.2)"
          flexWrap="wrap"
          gap={{ base: "16px", md: "24px" }}
          justifyContent="center"
          alignItems="center"
        >
          <Link to="/">
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="13px"
              fontWeight="600"
              color="#5c3f3d"
              _hover={{ color: "#a30019" }}
              transition="color 0.2s"
            >
              Consultar IA
            </Text>
          </Link>

          <Box onClick={onOpenPdfModal} cursor="pointer">
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="13px"
              fontWeight="600"
              color="#a30019"
              _hover={{ color: "#ce1126" }}
              transition="color 0.2s"
              display="flex"
              alignItems="center"
              gap="4px"
            >
              <MdPictureAsPdf size={16} />
              Legislação RAG (PDFs)
            </Text>
          </Box>

          <Link to="/sobre">
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="13px"
              fontWeight="600"
              color="#5c3f3d"
              _hover={{ color: "#a30019" }}
              transition="color 0.2s"
            >
              Sobre o Projecto
            </Text>
          </Link>

          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize="13px"
            fontWeight="500"
            color="#916f6c"
          >
            Lei n.º 12/23 & CRA 2010
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
