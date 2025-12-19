import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, Clock4, Loader2, Wallet } from 'lucide-react'
import { reservationAPI, paymentAPI } from '../services/api'

function Reservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [payingId, setPayingId] = useState(null)
  const [amount, setAmount] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      setLoading(true)
      const data = await reservationAPI.getAllReservations()
      setReservations(data)
      setError('')
    } catch (err) {
      console.error(err)
      setError('Failed to load reservations. Ensure backend is running on 8080/8182.')
    } finally {
      setLoading(false)
    }
  }

  const handlePay = async (reservationId) => {
    if (!amount || Number(amount) <= 0) return
    try {
      setPayingId(reservationId)
      setFeedback('')
      setError('')
      const res = await paymentAPI.processPayment({ reservationId, amount })
      setFeedback(`Payment ${res.status || 'COMPLETED'} for reservation ${reservationId}`)
    } catch (err) {
      console.error(err)
      setError('Payment failed. Check backend payment service (8183).')
    } finally {
      setPayingId(null)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-dark-400 text-xs uppercase tracking-[0.2em]">Your bookings</p>
          <h1 className="text-3xl font-bold text-white">Reservations</h1>
        </div>
        <button className="btn-primary" onClick={fetchReservations}>Refresh</button>
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
        </div>
      )}

      {feedback && (
        <div className="card border border-green-500/30 bg-green-500/10 text-green-100 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <span>{feedback}</span>
          </div>
        </div>
      )}

      {!loading && !error && reservations.length === 0 && (
        <div className="card text-dark-200">No reservations yet.</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {reservations.map((res) => (
          <div key={res.id || res.reservationId} className="card space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-xs">Reservation ID</p>
                <p className="text-lg text-white">{res.id ?? res.reservationId}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 text-dark-100 text-xs border border-white/10">
                {res.status || 'CONFIRMED'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-dark-200">
              <div className="card">
                <p className="text-dark-400 text-xs">Film</p>
                <p className="text-white">{res.filmId ?? '—'}</p>
              </div>
              <div className="card">
                <p className="text-dark-400 text-xs">User</p>
                <p className="text-white">{res.userId ?? '—'}</p>
              </div>
              <div className="card">
                <p className="text-dark-400 text-xs">Seats</p>
                <p className="text-white flex items-center gap-2"><Clock4 className="w-4 h-4" /> {res.numberOfSeats ?? '—'}</p>
              </div>
              <div className="card">
                <p className="text-dark-400 text-xs">Amount</p>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={payingId === res.id ? amount : ''}
                  onChange={(e) => {
                    setPayingId(res.id)
                    setAmount(e.target.value)
                  }}
                  className="input-field"
                  placeholder="e.g. 20.00"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => handlePay(res.id ?? res.reservationId)}
                disabled={payingId === (res.id ?? res.reservationId)}
              >
                {payingId === (res.id ?? res.reservationId) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wallet className="w-4 h-4" />
                )}
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reservations
