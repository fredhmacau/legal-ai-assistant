import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer({ onOpenPdfModal }) {
  return (
    <Box
      as="footer"
      w="100%"
      bg="#f3f4f5"
      borderTop="1px solid"
      borderColor="rgba(230, 189, 186, 0.3)"
      py={{ base: "32px", md: "40px" }}
    >
      <Box maxW="1280px" mx="auto" px={{ base: "16px", md: "40px" }}>
        {/* Links Row */}
        <Flex
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

          <Box h="14px" w="1px" bg="rgba(230, 189, 186, 0.6)" display={{ base: "none", sm: "block" }} />

          {/* Social Links */}
          <Flex alignItems="center" gap="16px">
            <Box
              as="a"
              href="https://github.com/fredhmacau/legal-ai-assistant"
              target="_blank"
              rel="noopener noreferrer"
              color="#5c3f3d"
              _hover={{ color: "#191c1d", transform: "scale(1.1)" }}
              transition="all 0.2s"
              display="flex"
              alignItems="center"
              gap="4px"
            >
              <FaGithub size={16} />
              <Text fontFamily="'Montserrat', sans-serif" fontSize="13px" fontWeight="600">
                GitHub
              </Text>
            </Box>

            <Box
              as="a"
              href="www.linkedin.com/in/frederico-macau-195167273"
              target="_blank"
              rel="noopener noreferrer"
              color="#0a66c2"
              _hover={{ color: "#084e96", transform: "scale(1.1)" }}
              transition="all 0.2s"
              display="flex"
              alignItems="center"
              gap="4px"
            >
              <FaLinkedin size={16} />
              <Text fontFamily="'Montserrat', sans-serif" fontSize="13px" fontWeight="600">
                LinkedIn
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
