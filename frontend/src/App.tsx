import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import TickerPage from './pages/TickerPage'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ticker/:ticker" element={<TickerPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
