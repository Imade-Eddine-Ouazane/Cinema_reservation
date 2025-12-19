import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Reservations from './pages/Reservations'

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-dark-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="footer">
        <div className="container">
          © 2025 CineReserve • React + Spring Boot
        </div>
      </footer>
    </div>
  )
}

export default App
