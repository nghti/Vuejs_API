export default {
  COLLAPSE_SIDE_BAR (state) {
    state.collapsedSideBar = !state.collapsedSideBar
  },
  SET_LOADING (state, status) {
    state.loading = status
  }
}
