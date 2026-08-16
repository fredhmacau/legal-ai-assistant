# Legal AI — Agente Jurídico Laboral para Angola

*Projeto desenvolvido no âmbito do challenge individual do ONE (Oracle Next Education).*

## Descrição

[#descricao](#descricao)

Cerca de 78% a 80% dos trabalhadores angolanos estão inseridos na economia informal, segundo o Inquérito sobre o Emprego em Angola (INE, 2025/2026). A Lei Geral do Trabalho (Lei n.º 12/23), aprovada em Dezembro de 2023, é ainda recente e pouco divulgada fora de círculos jurídicos e empresariais, o que faz com que grande parte dos trabalhadores, tanto no sector formal como na fronteira com a informalidade, desconheça os seus direitos básicos. O acesso a aconselhamento jurídico tem custo, e essa barreira leva à aceitação silenciosa de práticas irregulares em situações como despedimento, subsídio de férias, horas extraordinárias ou período experimental.

O Legal AI é um agente conversacional que recebe uma situação laboral descrita em linguagem natural e devolve os artigos da Constituição da República de Angola e da Lei Geral do Trabalho aplicáveis a essa situação, com citação precisa. O agente não substitui aconselhamento jurídico profissional; o seu papel é informar o utilizador sobre o que a lei diz, para que este possa tomar decisões mais informadas ou saber quando procurar as entidades competentes.

## Visão geral

[#visao-geral](#visao-geral)

O agente segue uma arquitetura de Agentic RAG construída sobre LangGraph, com decomposição de perguntas complexas, recuperação híbrida (semântica e por palavra-chave) e um passo de auto-crítica antes da síntese da resposta final.

Fontes de dados nesta primeira fase:

- Constituição da República de Angola (PDF oficial)
- Lei Geral do Trabalho — Lei n.º 12/23 (PDF oficial)

Cruzamento com outras fontes (por exemplo, dados do INE) fica fora do escopo desta fase e é um requisito futuro.

### Stack técnica

[#stack-tecnica](#stack-tecnica)

- **API**: FastAPI (assíncrono), Uvicorn
- **Orquestração do agente**: LangChain, LangGraph
- **LLM de síntese e citação (produção)**: Cohere (Command R+/A)
- **LLM de testes e desenvolvimento**: Google Gemini
- **LLM das ferramentas (tool-calling)**: Groq (modelos Llama Tool-Use)
- **Embeddings**: HuggingFace Inference API (modelo multilingue, ex. `multilingual-e5-large` ou `bge-m3`)
- **Vectorstore**: Qdrant (cliente assíncrono nativo)
- **Busca por palavra-chave**: rank-bm25 (componente da recuperação híbrida)
- **Extração de PDF**: PyMuPDF, com chunking por unidade lógica (artigo), não por tamanho fixo
- **Frontend**: React

## Pré-requisitos

[#pre-requisitos](#pre-requisitos)

- Python 3.11 ou superior
- Conta e chave de API na Cohere
- Conta e chave de API no Google AI Studio (Gemini)
- Conta e chave de API na Groq
- Conta e token de acesso na HuggingFace (Inference API)
- Qdrant a correr localmente (Docker) ou instância Qdrant Cloud
- PDFs oficiais da Constituição da República de Angola e da Lei Geral do Trabalho (Lei 12/23)

## Instruções de execução

[#instrucoes-de-execucao](#instrucoes-de-execucao)

Em breve.

## Fontes legais

[#fontes-legais](#fontes-legais)

- Lei Geral do Trabalho (Lei n.º 12/23) — Ministério da Administração Pública, Trabalho e Segurança Social
- Portal dedicado à LGT: lgt.gov.ao
- Constituição da República de Angola

## Uso de IA

[#uso-de-ia](#uso-de-ia)

Durante o desenho deste projeto, foi usado o Claude (Anthropic) como apoio conceptual nas seguintes tarefas:

- Discussão e comparação de arquiteturas de Agentic RAG
- Avaliação de opções de LLM e embeddings para o caso de uso
- Estruturação do grafo de decisão (decomposição, recuperação, auto-crítica, síntese)

Todo o código do projeto foi escrito de forma independente, como parte do processo de aprendizagem do challenge.

## About

Sem descrição, site ou tópicos definidos ainda.