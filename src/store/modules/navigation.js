
const state = () => ({
  currentDate: new Date().toISOString().split('T')[0]
})

const getters = {}

const actions = {
  navigate ({ commit, state }, days) {
    const currentDate = new Date(state.currentDate)
    const today = new Date()
    if (days === 0) {
      commit('setCurrentDate', today.toISOString().split('T')[0])
    } else {
      currentDate.setDate(currentDate.getDate() + days)
      commit('setCurrentDate', currentDate.toISOString().split('T')[0])
    }
  }
}

const mutations = {
  setCurrentDate (state, date) {
    state.currentDate = date
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
