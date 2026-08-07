import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import PdfDownloadModal from './components/PdfDownloadModal'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)

  const handleOpenPdfModal = () => {
    setIsPdfModalOpen(true)
  }

  const handleClosePdfModal = () => {
    setIsPdfModalOpen(false)
  }

  return (
    <Box className="bg-samakaka" minH="100vh" display="flex" flexDirection="column">
      <Header onOpenPdfModal={handleOpenPdfModal} />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage onOpenPdfModal={handleOpenPdfModal} />} />
          <Route path="/chat" element={<ChatPage onOpenPdfModal={handleOpenPdfModal} />} />
          <Route path="/sobre" element={<AboutPage onOpenPdfModal={handleOpenPdfModal} />} />
        </Routes>
      </Box>
      <Footer onOpenPdfModal={handleOpenPdfModal} />

      {/* Global RAG PDF Download Modal */}
      <PdfDownloadModal isOpen={isPdfModalOpen} onClose={handleClosePdfModal} />
    </Box>
  )
}

export default App
