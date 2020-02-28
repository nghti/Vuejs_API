import Helpers from '../../../utils/helpers'

export default {
  LOGIN_SUCCESS (state, payload) {
    Helpers.saveToken(payload.token)
    // Helpers.saveAuthInfo(payload.user)

    state.accessToken = payload.access_token
    // state.authInfo = payload.user
  },
  LOGOUT_SUCCESS (state) {
    Helpers.removeToken()
    state.accessToken = null
  }
}
