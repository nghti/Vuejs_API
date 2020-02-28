export default {
  collapseSideBar ({ commit }) {
    commit('COLLAPSE_SIDE_BAR')
  },
  setLoading ({ commit }, status) {
    commit('SET_LOADING', status)
  }
}
