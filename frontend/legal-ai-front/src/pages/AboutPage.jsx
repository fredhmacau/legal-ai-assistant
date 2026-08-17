import { Box, Flex, Text, Button, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  MdGavel,
  MdAutoAwesome,
  MdMenuBook,
  MdShield,
  MdVerifiedUser,
  MdArrowForward,
  MdDownload,
  MdPsychology,
  MdMenuBook as MdBook,
} from "react-icons/md";

export default function AboutPage({ onOpenPdfModal }) {
  return (
    <Box className="bg-samakaka" minH="100vh" pt="80px" pb="120px">
      <Box maxW="1280px" mx="auto" px={{ base: "16px", md: "40px" }}>
        {/* Hero Section */}
        <Flex
          direction="column"
          alignItems="center"
          textAlign="center"
          py={{ base: "32px", md: "64px" }}
          maxW="840px"
          mx="auto"
        >
          

          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize={{ base: "32px", md: "48px" }}
            fontWeight="800"
            lineHeight={{ base: "1.2", md: "1.15" }}
            color="#191c1d"
            mb="24px"
          >
            Democratizando o acesso à{" "}
            <Text as="span" color="#a30019">
              Justiça e Legislação
            </Text>{" "}
            em Angola
          </Text>

          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize={{ base: "16px", md: "20px" }}
            fontWeight="400"
            lineHeight="1.6"
            color="#5c3f3d"
            mb="40px"
          >
            O <Text as="span" fontWeight="700" color="#191c1d">Kamba da Lei</Text> é o seu assistente inteligente especializado na <Text as="span" fontWeight="700">Constituição da República de Angola</Text> e na <Text as="span" fontWeight="700">Lei Geral do Trabalho (Lei n.º 12/23)</Text>. Combinamos inteligência artificial com a rigorosa recuperação contextual de artigos oficiais.
          </Text>

          <Flex gap="16px" flexWrap="wrap" justifyContent="center">
            <Link to="/">
              <Button
                bg="#a30019"
                color="white"
                size="lg"
                px="28px"
                py="20px"
                borderRadius="8px"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="600"
                fontSize="16px"
                gap="8px"
                _hover={{ bg: "#ce1126" }}
                boxShadow="0 10px 25px rgba(163, 0, 25, 0.25)"
              >
                Fazer uma Consulta <MdArrowForward size={20} />
              </Button>
            </Link>

            <Button
              onClick={onOpenPdfModal}
              variant="outline"
              borderColor="#725c00"
              color="#725c00"
              size="lg"
              px="24px"
              py="20px"
              borderRadius="8px"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="600"
              fontSize="16px"
              gap="8px"
              _hover={{ bg: "rgba(254, 211, 48, 0.15)" }}
            >
              <MdDownload size={20} /> Ver Legislação RAG (PDFs)
            </Button>
          </Flex>
        </Flex>

        {/* How RAG Works Section */}
        <Box
          mt="48px"
          bg="white"
          borderRadius="20px"
          p={{ base: "24px", md: "48px" }}
          boxShadow="0 20px 40px rgba(0,0,0,0.04)"
          border="1px solid #e7e8e9"
        >
          {/* <Text
            fontFamily="'JetBrains Mono', monospace"
            fontSize="13px"
            fontWeight="600"
            color="#a30019"
            textTransform="uppercase"
            letterSpacing="0.1em"
            mb="8px"
          >
            Tecnologia de Ponta
          </Text> */}
          <Text
            fontFamily="'Montserrat', sans-serif"
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight="700"
            color="#191c1d"
            mb="32px"
          >
            Como Funciona o Nosso Motor RAG
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="24px">
            <Box
              p="24px"
              bg="#f8f9fa"
              borderRadius="12px"
              borderLeft="4px solid #ce1126"
            >
              <Flex
                w="48px"
                h="48px"
                bg="#ffdad7"
                color="#a30019"
                borderRadius="8px"
                alignItems="center"
                justifyContent="center"
                mb="16px"
              >
                <MdBook size={26} />
              </Flex>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="18px"
                fontWeight="700"
                color="#191c1d"
                mb="8px"
              >
                1. Indexação de PDFs
              </Text>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="14px"
                color="#5c3f3d"
                lineHeight="1.6"
              >
                Carregamos e estruturamos os ficheiros oficiais em PDF da Constituição da República de Angola e da Lei Geral do Trabalho (Lei n.º 12/23).
              </Text>
            </Box>

            <Box
              p="24px"
              bg="#f8f9fa"
              borderRadius="12px"
              borderLeft="4px solid #fed330"
            >
              <Flex
                w="48px"
                h="48px"
                bg="#ffe07d"
                color="#725c00"
                borderRadius="8px"
                alignItems="center"
                justifyContent="center"
                mb="16px"
              >
                <MdPsychology size={26} />
              </Flex>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="18px"
                fontWeight="700"
                color="#191c1d"
                mb="8px"
              >
                2. Busca Semântica RAG
              </Text>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="14px"
                color="#5c3f3d"
                lineHeight="1.6"
              >
                Ao fazer uma pergunta, o algoritmo busca exatamente os artigos e cláusulas mais relevantes na legislação angolana indexada.
              </Text>
            </Box>

            <Box
              p="24px"
              bg="#f8f9fa"
              borderRadius="12px"
              borderLeft="4px solid #4f4f4f"
            >
              <Flex
                w="48px"
                h="48px"
                bg="#e2e2e2"
                color="#1b1b1b"
                borderRadius="8px"
                alignItems="center"
                justifyContent="center"
                mb="16px"
              >
                <MdAutoAwesome size={26} />
              </Flex>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="18px"
                fontWeight="700"
                color="#191c1d"
                mb="8px"
              >
                3. Resposta Fundamentada
              </Text>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="14px"
                color="#5c3f3d"
                lineHeight="1.6"
              >
                O modelo sintetiza a explicação em linguagem clara, citando expressamente o diploma legal e o número do artigo correspondente.
              </Text>
            </Box>
          </Grid>
        </Box>

        {/* Pillars / Values Section */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="24px" mt="48px">
          <Box
            bg="white"
            p="32px"
            borderRadius="16px"
            border="1px solid #e7e8e9"
            boxShadow="sm"
          >
            <MdGavel size={32} color="#a30019" />
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="20px"
              fontWeight="700"
              color="#191c1d"
              mt="16px"
              mb="8px"
            >
              Rigor Jurídico
            </Text>
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="14px"
              color="#5c3f3d"
              lineHeight="1.6"
            >
              Focado estritamente na legislação da República de Angola, garantindo respostas alinhadas às normas vigentes no país.
            </Text>
          </Box>

          <Box
            bg="white"
            p="32px"
            borderRadius="16px"
            border="1px solid #e7e8e9"
            boxShadow="sm"
          >
            <MdMenuBook size={32} color="#725c00" />
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="20px"
              fontWeight="700"
              color="#191c1d"
              mt="16px"
              mb="8px"
            >
              Transparência Total
            </Text>
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="14px"
              color="#5c3f3d"
              lineHeight="1.6"
            >
              Todas as respostas incluem citações de artigos e disponibilização dos PDFs originais para verificação direta pelo cidadão.
            </Text>
          </Box>

          <Box
            bg="white"
            p="32px"
            borderRadius="16px"
            border="1px solid #e7e8e9"
            boxShadow="sm"
          >
            <MdShield size={32} color="#ce1126" />
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="20px"
              fontWeight="700"
              color="#191c1d"
              mt="16px"
              mb="8px"
            >
              Privacidade & Ética
            </Text>
            <Text
              fontFamily="'Montserrat', sans-serif"
              fontSize="14px"
              color="#5c3f3d"
              lineHeight="1.6"
            >
              Suas consultas são tratadas com sigilo e confidencialidade, promovendo o empoderamento jurídico de forma segura.
            </Text>
          </Box>
        </Grid>

        {/* Legal Disclaimer Card */}
        <Box
          mt="48px"
          bg="#fff8f8"
          border="1px solid #ffb3ae"
          borderRadius="16px"
          p={{ base: "24px", md: "32px" }}
        >
          <Flex gap="16px" alignItems="flex-start" direction={{ base: "column", sm: "row" }}>
            <Box
              w="48px"
              h="48px"
              minW="48px"
              bg="#ce1126"
              color="white"
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MdShield size={28} />
            </Box>
            <Box>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="18px"
                fontWeight="700"
                color="#a30019"
                mb="8px"
              >
                Aviso Importante de Isenção de Responsabilidade Jurídica
              </Text>
              <Text
                fontFamily="'Montserrat', sans-serif"
                fontSize="14px"
                lineHeight="1.6"
                color="#5c3f3d"
              >
                O <Text as="span" fontWeight="700">Kamba da Lei</Text> é um assistente de inteligência artificial concebido exclusivamente para fins informativos, educacionais e de pesquisa preliminar. As respostas geradas não constituem um parecer jurídico vinculado e não substituem o aconselhamento formal prestado por um **Advogado ou Jurista** devidamente inscrito na **Ordem dos Advogados de Angola (OAA)**.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
