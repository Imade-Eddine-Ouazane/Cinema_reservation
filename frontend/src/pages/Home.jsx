import { useEffect, useState } from 'react'
import { Film, Loader2, AlertTriangle } from 'lucide-react'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'
import { filmAPI } from '../services/api'

function Home() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFilms()
  }, [])

  const fetchFilms = async () => {
    try {
      setLoading(true)
      const data = await filmAPI.getAllFilms()
      setFilms(data)
      setError('')
    } catch (err) {
      console.error(err)
      setError('Failed to load films. Ensure backend services are running on 8080/8181.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Hero />

      <section id="movies" className="bg-dark-900">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-dark-400 uppercase text-xs tracking-[0.2em]">Now Showing</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Pick a movie</h2>
            </div>
            <Film className="w-10 h-10 text-red-400" />
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 text-red-400 animate-spin" />
            </div>
          )}

          {error && (
            <div className="card border border-red-500/30 bg-red-500/10 text-red-100 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                <span>{error}</span>
              </div>
              <button onClick={fetchFilms} className="btn-primary mt-4 w-fit">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && films.length === 0 && (
            <div className="card text-center text-dark-200">
              <p>No movies available yet.</p>
            </div>
          )}

          <div className="movie-grid">
            {films.map((film) => (
              <MovieCard key={film.id} film={film} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
