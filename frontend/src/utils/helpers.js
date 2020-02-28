import { TOKEN_KEY } from './constants'
// import { TOKEN_KEY, AUTH_INFO } from './constants'

export default {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY) || null
  },

  saveToken: (accessToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY)
  },

  // saveAuthInfo: (user) => {
  //   localStorage.setItem(AUTH_INFO, JSON.stringify(user))
  // },

  // getAuthInfo: () => {
  //   return JSON.parse(localStorage.getItem(AUTH_INFO))
  // },

  // removeAuthInfo: () => {
  //   localStorage.removeItem(AUTH_INFO)
  // },

  getBaseApiUrl () {
    return `${process.env.VUE_APP_BASE_API_URL}` || 'http://localhost/api'
  }
}
