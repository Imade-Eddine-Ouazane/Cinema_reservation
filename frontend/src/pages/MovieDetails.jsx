import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AlertTriangle, Loader2, Ticket } from 'lucide-react'
import { filmAPI, reservationAPI } from '../services/api'

function MovieDetails() {
  const { id } = useParams()
  const [film, setFilm] = useState(null)
  const [seats, setSeats] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await filmAPI.getFilmById(id)
        setFilm(data)
        setError('')
      } catch (err) {
        console.error(err)
        setError('Failed to load movie. Make sure backend is running.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleReserve = async () => {
    if (!seats || seats < 1) return
    try {
      setSaving(true)
      setMessage('')
      setError('')
      const res = await reservationAPI.createReservation({ filmId: id, userId: 1, numberOfSeats: seats })
      setMessage(`Reservation confirmed with ID ${res.id ?? ''}`)
    } catch (err) {
      console.error(err)
      setError('Reservation failed. Check seat availability and try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-16 flex justify-center">
        <Loader2 className="w-10 h-10 text-red-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-16">
        <div className="card border border-red-500/30 bg-red-500/10 text-red-100">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    )
  }

  if (!film) return null

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="card md:col-span-2">
          <p className="text-dark-400 text-sm mb-2">Movie ID: {film.id}</p>
          <h1 className="text-3xl font-bold text-white mb-3">{film.title}</h1>
          <p className="text-dark-200 leading-relaxed mb-6">{film.description || 'No description provided.'}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-dark-200">
            <div className="card">
              <p className="text-dark-400 text-xs">Duration</p>
              <p className="text-lg text-white">{film.duration ? `${film.duration} min` : '—'}</p>
            </div>
            <div className="card">
              <p className="text-dark-400 text-xs">Available seats</p>
              <p className="text-lg text-white">{film.availableSeats ?? '—'}</p>
            </div>
            <div className="card">
              <p className="text-dark-400 text-xs">Reserve</p>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="number"
                  min={1}
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="input-field"
                />
                <button className="btn-primary flex items-center gap-2" onClick={handleReserve} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ticket className="w-4 h-4" />}
                  Reserve
                </button>
              </div>
            </div>
          </div>

          {message && <div className="card bg-green-500/10 border border-green-500/20 text-green-100 mt-4">{message}</div>}
          {!message && error && <div className="card bg-red-500/10 border border-red-500/30 text-red-100 mt-4">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
