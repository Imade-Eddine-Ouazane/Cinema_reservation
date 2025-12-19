import { NavLink } from 'react-router-dom'
import { Film, Ticket, Wallet } from 'lucide-react'

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
    isActive ? 'bg-red-500/15 text-red-200 border border-red-500/30' : 'text-dark-100 hover:text-white hover:bg-white/5'
  }`

function Navbar() {
  return (
    <header className="navbar">
      <div className="container flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <Film className="w-6 h-6 text-red-400" />
          CineReserve
        </NavLink>

        <nav className="flex items-center gap-2 text-sm font-medium">
          <NavLink to="/" className={navLinkClass} end>
            <span>Movies</span>
          </NavLink>
          <NavLink to="/reservations" className={navLinkClass}>
            <Ticket className="w-4 h-4" />
            <span>Reservations</span>
          </NavLink>
          <a
            href="http://localhost:8080/swagger-ui/index.html"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-white/5 transition"
          >
            <Wallet className="w-4 h-4" />
            API Docs
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
