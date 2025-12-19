import { Link } from 'react-router-dom'
import { Clock4, Ticket } from 'lucide-react'

function MovieCard({ film }) {
  return (
    <article className="card flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white truncate" title={film.title}>{film.title}</h3>
        <span className="inline-flex items-center gap-1 text-sm text-dark-200">
          <Clock4 className="w-4 h-4" />
          {film.duration ? `${film.duration} min` : '—'}
        </span>
      </header>
      <p className="text-sm text-dark-200 line-clamp-3">{film.description || 'No description provided.'}</p>
      <div className="flex items-center justify-between text-sm text-dark-200">
        <span className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-red-400" />
          Seats: {film.availableSeats ?? '—'}
        </span>
        <span className="text-dark-400">ID: {film.id}</span>
      </div>
      <div className="flex gap-2 mt-auto">
        <Link to={`/movie/${film.id}`} className="btn-primary w-full text-center">
          Reserve
        </Link>
      </div>
    </article>
  )
}

export default MovieCard
