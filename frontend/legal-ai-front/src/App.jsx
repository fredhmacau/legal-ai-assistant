import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <Box className="bg-samakaka" minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
