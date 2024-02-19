import { dataReservations } from '../../data/reservations_mock'
const state = () => ({
  reservationsOnWeek: {}
})

const getters = {}

const actions = {
  getReservationsOnWeek ({ commit }, currentDate) {
    const startDate = new Date(currentDate)
    const dates = generateDateArray(startDate)
    const reservationsByRoom = groupReservationsByRoom(dataReservations, dates)
    commit('setReservationsOnWeek', reservationsByRoom)
  }
}

function generateDateArray (startDate) {
  const dateArray = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < 7; i++) {
    dateArray.push(new Date(currentDate).getTime())
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dateArray
}

function groupReservationsByRoom (reservations, dates) {
  const reservationsByRoom = {}
  reservations.forEach((reservation) => {
    reservationsByRoom[reservation.roomDetails.name] = {
      name: reservation.roomDetails.name,
      datesReservations: {}
    }
  })

  reservations.forEach((reservation) => {
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(dates[i]).toISOString().split('T')[0]
      if (+dates[i] >= new Date(reservation.start).getTime() && +dates[i] <= new Date(reservation.end).getTime()) {
        const idReservation = reservation.id
        if (!reservationsByRoom[reservation.roomDetails.name].datesReservations[currentDate]) {
          reservationsByRoom[reservation.roomDetails.name].datesReservations[currentDate] = {}
        }
        reservationsByRoom[reservation.roomDetails.name].datesReservations[currentDate][idReservation] = reservation
      }
    }
  })

  return reservationsByRoom
}

const mutations = {
  setReservationsOnWeek (state, reservations) {
    state.reservationsOnWeek = reservations
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
