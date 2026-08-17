import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import {
  MdClose,
  MdDownload,
  MdPictureAsPdf,
  MdVerified,
  MdOpenInNew,
} from "react-icons/md";


const ragDocuments = [
  {
    id: "cra-angola",
    title: "Constituição da República de Angola (CRA)",
    category: "Constitucional",
    diploma: "Constituição da República de Angola",
    year: "2010 (Revisão Constitucional 2021)",
    description:
      "Texto supremo e fundamental do ordenamento jurídico angolano. Consagra os direitos, liberdades e garantias fundamentais de todos os cidadãos.",
    downloadUrl:
      "https://plataformacipra.gov.ao/public/ficheiros/arquivos/Gov_AngolaConstitui%C3%A7%C3%A3o190102230948141675284494.pdf",
    tagColor: "#ce1126",
    filename: "Constituicao_Republica_Angola.pdf",
  },
  {
    id: "lgt-2023",
    title: "Lei Geral do Trabalho (Lei n.º 12/23)",
    category: "Direito Laboral",
    diploma: "Lei n.º 12/23 de 27 de Dezembro",
    year: "2023",
    description:
      "Diploma regulador das relações jurídico-laborais em Angola. Abrange contratação, período experimental, remuneração, direitos disciplinares e cessação de contratos.",
    downloadUrl:
      "https://inej.ao/wp-content/uploads/2025/12/LEI-GERAL-DO-TRABALHO.pdf",
    tagColor: "#a30019",
    filename: "Lei_Geral_do_Trabalho_Angola_12_23.pdf",
  },
];

export default function PdfDownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleOpenPdf = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
        maxW="820px"
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
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight="700"
                lineHeight="1.2"
              >
                Legislação Oficial Indexada no RAG
              </Text>
              <Text
                fontFamily="'JetBrains Mono', monospace"
                fontSize="11px"
                fontWeight="500"
                color="#fed330"
                letterSpacing="0.05em"
              >
                CONSTITUIÇÃO DA REPÚBLICA & LEI GERAL DO TRABALHO
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

        {/* Subtitle description */}
        <Box px={{ base: "20px", md: "32px" }} py="16px" bg="#f8f9fa" borderBottom="1px solid #e7e8e9">
          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize="14px"
            color="#5c3f3d"
            lineHeight="1.5"
          >
            Estes são os documentos originais em PDF utilizados pelo assistente de IA para a recuperação e fundamentação jurídica das respostas.
          </Text>
        </Box>

        {/* Document List */}
        <Box p={{ base: "16px", md: "24px" }}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="20px">
            {ragDocuments.map((doc) => (
              <Flex
                key={doc.id}
                direction="column"
                justifyContent="space-between"
                bg="white"
                p="20px"
                borderRadius="12px"
                border="1px solid #e7e8e9"
                borderTop={`4px solid ${doc.tagColor}`}
                boxShadow="0 4px 12px rgba(0,0,0,0.04)"
                _hover={{
                  borderColor: doc.tagColor,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
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
                      {doc.year}
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
                  borderTop="1px solid #f8f9fa"
                  justify="space-between"
                  align="center"
                  gap="8px"
                >
                  <Button
                    as="a"
                    href={doc.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    bg="#a30019"
                    color="white"
                    _hover={{ bg: "#ce1126" }}
                    fontFamily="'Montserrat', sans-serif"
                    fontSize="12px"
                    fontWeight="600"
                    gap="6px"
                    borderRadius="6px"
                    flex="1"
                  >
                    <MdOpenInNew size={16} /> Abrir / Baixar PDF
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Grid>
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
              fontSize="11px"
              color="#5c3f3d"
            >
              Links directos para fontes oficiais (CIPRA & INEJ)
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
