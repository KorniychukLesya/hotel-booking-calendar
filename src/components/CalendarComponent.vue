<template>
  <div id="app">
    <div class="calendar">
      <div class="calendar__navigation-block">
        <button class="calendar__navigation-button" @click="goBack">&lt; </button>
        <button class="calendar__navigation-button" @click="goForward">></button>
        <button class="calendar__navigation-button" @click="goToday">Today</button>
      </div>
      <div class="calendar__container">
        <div class="calendar__grid">
          <div class="calendar__apartment-column">
            <div class="calendar__cell-head"></div>
            <div
              v-for="apartment in apartments"
              :key="apartment.name"
              class="calendar__cell"
            >
              {{ apartment.name }}
            </div>
          </div>
          <div
            v-for="(day) in week"
            :key="day"
            class="calendar__day-column"
          >
            <div class="calendar__cell-head">{{ day }}</div>
            <div
              v-for="apartment in apartments"
              :key="apartment.name"
              class="calendar__cell"
            >
              <div
                v-for="(reservation) in apartment.datesReservations[day]"
                :key="reservation.name"
              >
                <div
                  @click="openModal(day, reservation)"
                  class="calendar__cell-active"
                  :class="{
                    'calendar__cell-active-end': reservation.end === day,
                    'calendar__cell-active-start': reservation.start === day,
                  }"
                >
                  <div
                    class="calendar__cell-active-name"
                    v-if="day === Object.keys(apartment.datesReservations)[Math.round(Object.keys(apartment.datesReservations).length / 2)-1]">
                    {{ reservation.name }}
                  </div>
                </div>
                <ReservationDataModal
                  v-if="reservation.id === idReservation
                    && day === targetDay"
                  :is-open="modalOpen"
                  :message="modalMessage" @close="closeModal"
                >
                </ReservationDataModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReservationDataModal from './ReservationDataModal.vue'

export default {
  components: {
    ReservationDataModal
  },
  data () {
    return {
      modalOpen: false,
      modalMessage: {},
      idReservation: null,
      targetDay: null
    }
  },
  computed: {
    ...mapState('navigation', ['currentDate']),
    ...mapState('reservations', ['reservationsOnWeek']),
    week () {
      // Calculate the days of the current week
      const today = new Date(this.currentDate)
      const startOfWeek = new Date(today.setDate(today.getDate()))
      const week = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(startOfWeek.getDate() + i)
        week.push(date.toISOString().split('T')[0])
      }
      return week
    },
    apartments () {
      // Get the list of apartments
      return this.reservationsOnWeek
    }
  },
  mounted: function () {
    this.$store.dispatch('reservations/getReservationsOnWeek', this.currentDate)
  },
  methods: {
    // Dispatch Vuex action to navigate
    goBack () {
      this.$store.dispatch('navigation/navigate', -7)
    },
    goForward () {
      this.$store.dispatch('navigation/navigate', 7)
    },
    goToday () {
      this.$store.dispatch('navigation/navigate', 0)
    },
    openModal (day, reservation) {
      this.idReservation = reservation.id
      this.targetDay = day
      this.modalMessage = reservation
      this.modalOpen = true
    },
    closeModal () {
      this.modalOpen = false
    },
    getReservationCount (day, apartment) {
      const reservations = apartment.datesReservations[day] || []
      return reservations.length
    }
  },
  watch: {
    currentDate () {
      this.$store.dispatch('reservations/getReservationsOnWeek', this.currentDate)
    }
  }
}
</script>

<style>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 910px;
  gap: 30px;
  margin-top: 60px;
}

.calendar__navigation-block {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  width: 100%;
  justify-content: flex-start;
}

.calendar__navigation-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 2px 15px;
  background-color: #010157;
  color: #fff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}

.calendar__navigation-button:hover {
  background-color: #0e0583;
}

.calendar__grid {
  display: flex;
  justify-content: space-between;
  width: 910px;
  border-top: 1px solid #ded6d6;
  border-bottom: 1px solid #ded6d6;
  border-right: 1px solid #ded6d6;
}

.calendar__grid>* {
  flex-grow: 1;
}

.calendar__apartment-column {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  min-width: 200px;
  font-weight: 600;
  color:#068d21;
}

.calendar__day-column {
  display: flex;
  flex-direction: column;
}

.calendar__cell-head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-weight: 600;
  color:#010157;
  border-left: 1px solid #ded6d6;
}

.calendar__cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 100px;

  border-top: 1px solid #ded6d6;
  border-left: 1px solid #ded6d6;

}

.calendar__cell-active {
  position: absolute;
  background-color: #3589e3;
  width: 102px;
  color: #fff;
  left: 0;
  bottom: 0;
  height: 70px;
  z-index: 2;
}

.calendar__cell-active-name {
  position: absolute;
  margin-top: 25px;
  font-weight: 600;
  color: #010157;
  z-index: 3;
}

.calendar__cell-active-end {
  position: absolute;
  background-color: #3589e3;
  width: 50px;
  color: #fff;
  left: -2px;
  bottom: 0;
  height: 70px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 2;
}

.calendar__cell-active-start {
  position: absolute;
  background-color: #3589e3;
  width: 50px;
  color: #fff;
  left: 52px;
  bottom: 0;
  height: 70px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  z-index: 2;
}
</style>
