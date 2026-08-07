import { useState } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { MdPerson, MdMenu, MdClose, MdPictureAsPdf } from "react-icons/md";

export default function Header({ onOpenPdfModal }) {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { label: "Consultar", path: "/" },
    { label: "Documentação (PDFs RAG)", onClick: onOpenPdfModal, isAction: true },
    { label: "Sobre", path: "/sobre" },
  ];

  const isActive = (path) => {
    if (!path) return false;
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
      bg="rgba(248, 249, 250, 0.9)"
      backdropFilter="blur(24px)"
      boxShadow="0 1px 8px rgba(0,0,0,0.06)"
      borderBottom="1px solid rgba(230, 189, 186, 0.2)"
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
        <Link to="/">
          <Flex alignItems="center" gap="3">
            <Box
              w="36px"
              h="36px"
              bg="#ce1126"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="6px"
              boxShadow="0 2px 8px rgba(206, 17, 38, 0.3)"
            >
              <Text color="white" fontWeight="800" fontSize="18px" fontFamily="'Montserrat', sans-serif">
                K
              </Text>
            </Box>
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize={{ base: "20px", md: "24px" }}
              fontWeight="700"
              lineHeight="32px"
              letterSpacing="-0.01em"
              color="#191c1d"
            >
              Kamba da Lei
            </Text>
          </Flex>
        </Link>

        {/* Desktop Navigation */}
        <Flex
          as="nav"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap="28px"
        >
          {navLinks.map((link) =>
            link.isAction ? (
              <Box
                key={link.label}
                onClick={link.onClick}
                cursor="pointer"
                display="flex"
                alignItems="center"
                gap="6px"
              >
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color="#a30019"
                  pb="2px"
                  transition="all 0.2s"
                  _hover={{ color: "#ce1126", transform: "translateY(-1px)" }}
                  fontFamily="'Montserrat', sans-serif"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                >
                  <MdPictureAsPdf size={16} />
                  {link.label}
                </Text>
              </Box>
            ) : (
              <Link key={link.path} to={link.path}>
                <Text
                  fontSize="14px"
                  fontWeight={isActive(link.path) ? "700" : "500"}
                  color={isActive(link.path) ? "#a30019" : "#5c3f3d"}
                  borderBottom={isActive(link.path) ? "2px solid #fed330" : "2px solid transparent"}
                  pb="2px"
                  transition="all 0.2s"
                  _hover={{ color: "#191c1d" }}
                  fontFamily="'Montserrat', sans-serif"
                >
                  {link.label}
                </Text>
              </Link>
            )
          )}
        </Flex>

        {/* Right Actions & Mobile Hamburger */}
        <Flex alignItems="center" gap="12px">
          <IconButton
            aria-label="User profile"
            rounded="full"
            w="36px"
            h="36px"
            minW="36px"
            bg="#a30019"
            color="white"
            _hover={{ bg: "#ce1126" }}
            size="sm"
          >
            <MdPerson size={20} />
          </IconButton>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Toggle navigation menu"
            display={{ base: "flex", md: "none" }}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            variant="ghost"
            color="#191c1d"
            size="md"
          >
            {mobileNavOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </IconButton>
        </Flex>
      </Flex>

      {/* Mobile Navigation Drawer / Menu */}
      {mobileNavOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          bg="white"
          borderBottom="1px solid #e7e8e9"
          px="24px"
          py="16px"
          boxShadow="0 10px 20px rgba(0,0,0,0.08)"
          className="animate-fade-in"
        >
          <Flex direction="column" gap="16px">
            <Link to="/" onClick={() => setMobileNavOpen(false)}>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="16px"
                fontWeight={isActive("/") ? "700" : "500"}
                color={isActive("/") ? "#a30019" : "#191c1d"}
                py="8px"
              >
                Consultar
              </Text>
            </Link>

            <Box
              onClick={() => {
                setMobileNavOpen(false);
                onOpenPdfModal?.();
              }}
              cursor="pointer"
              py="8px"
            >
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="16px"
                fontWeight="600"
                color="#a30019"
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <MdPictureAsPdf size={18} />
                Documentação (PDFs RAG)
              </Text>
            </Box>

            <Link to="/sobre" onClick={() => setMobileNavOpen(false)}>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="16px"
                fontWeight={isActive("/sobre") ? "700" : "500"}
                color={isActive("/sobre") ? "#a30019" : "#191c1d"}
                py="8px"
              >
                Sobre o Kamba da Lei
              </Text>
            </Link>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
