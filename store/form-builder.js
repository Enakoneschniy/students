export const store = () => ({
  formData: {}
})
export const getters = {
  getFormData (state) {
    return state.formData
  }
}
export const actions = {
  setFormData ({ commit }, data) {
    commit('setFormData', data)
  },
  async saveFormData ({ commit, state }) {
    try {
      await this.$axios.$post('/forms-data', state.formData)
      commit('clearFormData')
    } catch (e) {
      console.log(e)
    }
  }
}

export const mutations = {
  setFormData (state, data) {
    state.formData = Object.assign({}, state.formData, data)
  },
  clearFormData (state) {
    state.formData = {}
  }
}
