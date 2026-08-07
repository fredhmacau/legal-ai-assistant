import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { MdPerson } from "react-icons/md";

const navLinks = [
  { label: "Consultar", path: "/" },
  { label: "Documentação", path: "/documentos" },
  { label: "Sobre", path: "/sobre" },
];

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/chat";
    return location.pathname === path;
  };

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      width="100%"
      zIndex="50"
      bg="rgba(248, 249, 250, 0.8)"
      backdropFilter="blur(24px)"
      boxShadow="0 1px 8px rgba(0,0,0,0.04)"
    >
      <Flex
        h="64px"
        maxW="1280px"
        mx="auto"
        px={{ base: "16px", md: "40px" }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo + Title */}
        <Flex alignItems="center" gap="4">
          <Box
            w="32px"
            h="32px"
            bg="#ce1126"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Text color="white" fontWeight="800" fontSize="16px" fontFamily="'Inter', sans-serif">
              K
            </Text>
          </Box>
          <Text
            fontFamily="'Inter', sans-serif"
            fontSize="24px"
            fontWeight="700"
            lineHeight="32px"
            letterSpacing="-0.01em"
            color="#191c1d"
          >
            Kamba da Lei
          </Text>
        </Flex>

        {/* Navigation */}
        <Flex
          as="nav"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="24px"
        >
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Text
                fontSize="14px"
                fontWeight={isActive(link.path) ? "700" : "400"}
                color={isActive(link.path) ? "#a30019" : "#5c3f3d"}
                borderBottom={isActive(link.path) ? "2px solid #fed330" : "2px solid transparent"}
                pb="2px"
                transition="all 0.2s"
                _hover={{ color: "#191c1d" }}
                fontFamily="'Inter', sans-serif"
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </Flex>

        {/* User Avatar */}
        <IconButton
          aria-label="User profile"
          rounded="full"
          w="32px"
          h="32px"
          minW="32px"
          bg="#a30019"
          color="white"
          _hover={{ bg: "#ce1126" }}
          size="sm"
        >
          <MdPerson size={18} />
        </IconButton>
      </Flex>
    </Box>
  );
}
