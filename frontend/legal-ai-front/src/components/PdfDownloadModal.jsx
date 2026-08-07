import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import {
  MdClose,
  MdDownload,
  MdSearch,
  MdPictureAsPdf,
  MdVerified,
  MdFilterList,
} from "react-icons/md";

// RAG Indexed Documents Database
const ragDocuments = [
  {
    id: "cra-2010",
    title: "Constituição da República de Angola (CRA)",
    category: "Constitucional",
    year: "2010 (Revisão 2021)",
    size: "2.8 MB",
    articlesCount: 244,
    description:
      "Texto supremo da República de Angola. Fundamento de todo o ordenamento jurídico, direitos e garantias fundamentais.",
    downloadUrl: "#",
    tagColor: "#ce1126",
  },
  {
    id: "lgt-2023",
    title: "Lei Geral do Trabalho (Lei n.º 12/23)",
    category: "Trabalho",
    year: "2023",
    size: "3.4 MB",
    articlesCount: 322,
    description:
      "Regulamenta a relação jurídica de trabalho subordinado em Angola. Contratos, período experimental, despedimentos e direitos.",
    downloadUrl: "#",
    tagColor: "#a30019",
  },
  {
    id: "cc-angola",
    title: "Código Civil Angolano",
    category: "Civil",
    year: "Atualizado",
    size: "5.1 MB",
    articlesCount: 2314,
    description:
      "Regula o direito das obrigações, contratos civis, família, sucessões e direitos reais na jurisdição angolana.",
    downloadUrl: "#",
    tagColor: "#725c00",
  },
  {
    id: "cp-angola",
    title: "Código Penal Angolano (Lei n.º 38/20)",
    category: "Penal",
    year: "2020",
    size: "4.2 MB",
    articlesCount: 420,
    description:
      "Diploma que define os crimes, contravenções e respetivas penas aplicáveis no território nacional de Angola.",
    downloadUrl: "#",
    tagColor: "#4f4f4f",
  },
  {
    id: "cpc-angola",
    title: "Código de Processo Civil",
    category: "Civil",
    year: "Atualizado",
    size: "4.8 MB",
    articlesCount: 1540,
    description:
      "Normas processuais para a tramitação de acções cíveis nos Tribunais de Comarca, Relação e Supremo Tribunal.",
    downloadUrl: "#",
    tagColor: "#725c00",
  },
  {
    id: "cpp-angola",
    title: "Código de Processo Penal (Lei n.º 39/20)",
    category: "Penal",
    year: "2020",
    size: "3.9 MB",
    articlesCount: 610,
    description:
      "Processo de investigação criminal, instrução preparatória, julgamento e recursos penais.",
    downloadUrl: "#",
    tagColor: "#4f4f4f",
  },
];

const categories = ["Todos", "Constitucional", "Trabalho", "Civil", "Penal"];

export default function PdfDownloadModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  if (!isOpen) return null;

  const filteredDocs = ragDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (doc) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(doc.id);
      // Simulate file download trigger
      const link = document.createElement("a");
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(`[DOCUMENTO RAG: ${doc.title}]\nLegislação Angolana indexada no Kamba da Lei.\nCategoria: ${doc.category}`);
      link.download = `${doc.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 800);
  };

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: "12px", md: "24px" }}
      bg="rgba(25, 28, 29, 0.75)"
      backdropFilter="blur(8px)"
      onClick={onClose}
    >
      <Box
        bg="white"
        w="100%"
        maxW="900px"
        maxH="90vh"
        borderRadius="16px"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        onClick={(e) => e.stopPropagation()}
        border="1px solid rgba(230, 189, 186, 0.3)"
      >
        {/* Header */}
        <Flex
          px={{ base: "20px", md: "32px" }}
          py="20px"
          bg="#191c1d"
          color="white"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="3px solid #a30019"
        >
          <Flex alignItems="center" gap="12px">
            <Box
              w="40px"
              h="40px"
              bg="#a30019"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="8px"
            >
              <MdPictureAsPdf size={24} color="white" />
            </Box>
            <Box>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize={{ base: "18px", md: "22px" }}
                fontWeight="700"
                lineHeight="1.2"
              >
                Base de Dados RAG — Legislação Angolana
              </Text>
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="12px"
                fontWeight="500"
                color="#fed330"
                letterSpacing="0.05em"
              >
                DOCUMENTOS EM PDF UTILIZADOS PELO MODELO DE IA
              </Text>
            </Box>
          </Flex>
          <IconButton
            aria-label="Fechar modal"
            onClick={onClose}
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
            borderRadius="full"
            size="md"
          >
            <MdClose size={24} />
          </IconButton>
        </Flex>

        {/* Controls: Search + Categories */}
        <Box p={{ base: "16px", md: "24px" }} bg="#f8f9fa" borderBottom="1px solid #e7e8e9">
          <Flex direction={{ base: "column", sm: "row" }} gap="16px" mb="16px">
            <Flex
              flex="1"
              alignItems="center"
              bg="white"
              borderRadius="8px"
              px="12px"
              border="1px solid #e6bdba"
              _focusWithin={{ borderColor: "#a30019" }}
            >
              <MdSearch size={20} color="#916f6c" />
              <Input
                placeholder="Pesquisar documento, lei ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                border="none"
                outline="none"
                _focus={{ boxShadow: "none" }}
                fontFamily="'Montserrat', sans-serif"
                fontSize="14px"
                py="10px"
              />
              {searchTerm && (
                <IconButton
                  aria-label="Limpar busca"
                  size="xs"
                  variant="ghost"
                  onClick={() => setSearchTerm("")}
                >
                  <MdClose size={16} />
                </IconButton>
              )}
            </Flex>
          </Flex>

          {/* Category Pills */}
          <Flex gap="8px" overflowX="auto" pb="4px" scrollbarWidth="none">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                size="sm"
                px="16px"
                borderRadius="full"
                fontFamily="'Montserrat', sans-serif"
                fontSize="13px"
                fontWeight={selectedCategory === cat ? "600" : "400"}
                bg={selectedCategory === cat ? "#a30019" : "white"}
                color={selectedCategory === cat ? "white" : "#5c3f3d"}
                border={selectedCategory === cat ? "none" : "1px solid #e6bdba"}
                _hover={{
                  bg: selectedCategory === cat ? "#ce1126" : "#edeeef",
                }}
                flexShrink={0}
              >
                {cat}
              </Button>
            ))}
          </Flex>
        </Box>

        {/* Document List Container */}
        <Box
          p={{ base: "16px", md: "24px" }}
          overflowY="auto"
          flex="1"
          maxH="50vh"
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#e6bdba",
              borderRadius: "4px",
            },
          }}
        >
          {filteredDocs.length === 0 ? (
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              py="48px"
              color="#5c3f3d"
            >
              <MdFilterList size={40} opacity={0.5} />
              <Text mt="12px" fontFamily="'Montserrat', sans-serif" fontWeight="500">
                Nenhum documento encontrado para a pesquisa.
              </Text>
            </Flex>
          ) : (
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="16px">
              {filteredDocs.map((doc) => (
                <Flex
                  key={doc.id}
                  direction="column"
                  justifyContent="space-between"
                  bg="white"
                  p="20px"
                  borderRadius="12px"
                  border="1px solid #e7e8e9"
                  boxShadow="0 2px 8px rgba(0,0,0,0.03)"
                  _hover={{
                    borderColor: doc.tagColor,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  <Box>
                    <Flex justify="space-between" align="center" mb="8px">
                      <Box
                        px="8px"
                        py="2px"
                        borderRadius="4px"
                        bg="#f3f4f5"
                        borderLeft={`3px solid ${doc.tagColor}`}
                      >
                        <Text
                          fontFamily="'JetBrains Mono', monospace"
                          fontSize="11px"
                          fontWeight="600"
                          color="#5c3f3d"
                          textTransform="uppercase"
                        >
                          {doc.category}
                        </Text>
                      </Box>
                      <Text
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="11px"
                        color="#916f6c"
                      >
                        {doc.size}
                      </Text>
                    </Flex>

                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="16px"
                      fontWeight="700"
                      color="#191c1d"
                      mb="6px"
                      lineHeight="1.3"
                    >
                      {doc.title}
                    </Text>

                    <Text
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="13px"
                      color="#5c3f3d"
                      lineHeight="1.5"
                      mb="16px"
                    >
                      {doc.description}
                    </Text>
                  </Box>

                  <Flex
                    pt="12px"
                    borderTop="1px border"
                    borderColor="#f8f9fa"
                    justify="space-between"
                    align="center"
                  >
                    <Text
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="11px"
                      color="#916f6c"
                    >
                      {doc.articlesCount} Artigos Indexados
                    </Text>

                    <Button
                      onClick={() => handleDownload(doc)}
                      size="sm"
                      bg={downloadSuccess === doc.id ? "#16a34a" : "#a30019"}
                      color="white"
                      _hover={{ bg: downloadSuccess === doc.id ? "#15803d" : "#ce1126" }}
                      loading={downloadingId === doc.id}
                      disabled={downloadingId === doc.id}
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="12px"
                      fontWeight="600"
                      gap="6px"
                      borderRadius="6px"
                    >
                      {downloadSuccess === doc.id ? (
                        <>
                          <MdVerified size={16} /> Baixado
                        </>
                      ) : (
                        <>
                          <MdDownload size={16} /> Baixar PDF
                        </>
                      )}
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Grid>
          )}
        </Box>

        {/* Footer */}
        <Flex
          px={{ base: "20px", md: "32px" }}
          py="16px"
          bg="#f3f4f5"
          borderTop="1px solid #e7e8e9"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="12px"
        >
          <Flex alignItems="center" gap="8px">
            <MdVerified color="#16a34a" size={18} />
            <Text
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12px"
              color="#5c3f3d"
            >
              Documentos oficiais validados pelo Diário da República de Angola
            </Text>
          </Flex>

          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            borderColor="#916f6c"
            color="#191c1d"
            _hover={{ bg: "#e7e8e9" }}
            fontFamily="'Montserrat', sans-serif"
          >
            Fechar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
