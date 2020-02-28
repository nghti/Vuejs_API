import AuthService from '../../../services/Auth'
import { error, success } from '../../../utils/toastr'
import router from '../../../routes'

export default {
  async login ({ commit }, payload) {
    try {
      const { data } = await AuthService.login(payload)
      commit('LOGIN_SUCCESS', data)

      router.push(router.history.current.query.redirect || '/')
      success(window.trans('msg.login_success'))
    } catch (e) {
      error(window.trans('error'))
    }
  },

  async logout ({ commit }) {
    try {
      await AuthService.logout()
      commit('LOGOUT_SUCCESS')

      router.push({
        path: '/login',
        query: { redirect: router.history.current.path }
      })
    } catch (e) {
      commit('LOGOUT_SUCCESS')
      router.push({
        path: '/login',
        query: { redirect: router.history.current.path }
      })
    }
  },
}
