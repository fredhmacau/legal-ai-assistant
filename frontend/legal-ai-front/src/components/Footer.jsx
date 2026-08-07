import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";

const footerLinks = [
  { label: "Termos de Uso", href: "#" },
  { label: "Privacidade", href: "#" },
  { label: "Constituição", href: "#" },
];

export default function Footer() {
  return (
    <Box
      as="footer"
      w="100%"
      bg="#f3f4f5"
      borderTop="1px solid"
      borderColor="rgba(230, 189, 186, 0.3)"
      py="48px"
    >
      <Box maxW="1280px" mx="auto" px={{ base: "16px", md: "40px" }}>
        {/* Top Row */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap="8px"
        >
          <Flex alignItems="center" gap="2">
            <Text
              fontFamily="'Inter', sans-serif"
              fontSize="20px"
              fontWeight="600"
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
                fontWeight="500"
                lineHeight="16px"
                letterSpacing="0.05em"
                color="#5c3f3d"
              >
                AI LEGAL
              </Text>
            </Box>
          </Flex>
          <Text
            fontFamily="'Inter', sans-serif"
            fontSize="14px"
            fontWeight="400"
            color="#5c3f3d"
          >
            © 2024 República de Angola. Justiça e Eficiência.
          </Text>
        </Flex>

        {/* Links Row */}
        <Flex
          mt="32px"
          pt="32px"
          borderTop="1px solid"
          borderColor="rgba(230, 189, 186, 0.1)"
          flexWrap="wrap"
          gap="24px"
          justifyContent="center"
        >
          {footerLinks.map((link) => (
            <ChakraLink
              key={link.label}
              href={link.href}
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12px"
              fontWeight="500"
              lineHeight="16px"
              letterSpacing="0.05em"
              color="#5c3f3d"
              textTransform="uppercase"
              _hover={{ color: "#a30019" }}
              transition="color 0.2s"
              textDecoration="none"
            >
              {link.label}
            </ChakraLink>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
