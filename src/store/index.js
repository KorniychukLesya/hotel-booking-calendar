import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import navigation from './modules/navigation'
import reservations from './modules/reservations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    navigation,
    reservations
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
