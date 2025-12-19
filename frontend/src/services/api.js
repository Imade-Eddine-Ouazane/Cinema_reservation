import axios from 'axios'

const GATEWAY_URL = 'http://localhost:8080'

export const filmAPI = {
  async getAllFilms() {
    const res = await axios.get(`${GATEWAY_URL}/films`)
    const films = res.data._embedded?.films || res.data || []
    return films.map((film) => ({
      ...film,
      id: film._links?.self?.href?.split('/')?.pop() || film.id,
    }))
  },

  async getFilmById(id) {
    const res = await axios.get(`${GATEWAY_URL}/films/${id}`)
    return res.data
  },

  async reserveSeats(filmId, numberOfSeats) {
    const res = await axios.post(`${GATEWAY_URL}/films/reserve`, {
      filmId,
      numberOfSeats,
    })
    return res.data
  },
}

export const reservationAPI = {
  async createReservation({ filmId, userId, numberOfSeats }) {
    const res = await axios.post(
      `${GATEWAY_URL}/reservations?filmId=${filmId}&userId=${userId}&numberOfSeats=${numberOfSeats}`
    )
    return res.data
  },

  async getAllReservations() {
    const res = await axios.get(`${GATEWAY_URL}/reservations`)
    const data = res.data
    return Array.isArray(data) ? data : data._embedded?.reservations || []
  },
}

export const paymentAPI = {
  async processPayment({ reservationId, amount }) {
    const res = await axios.post(
      `${GATEWAY_URL}/payments?reservationId=${reservationId}&amount=${amount}`
    )
    return res.data
  },
}
