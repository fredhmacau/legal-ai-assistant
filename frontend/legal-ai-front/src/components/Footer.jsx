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
