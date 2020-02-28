import Client from '../utils/client'

class AuthService {
  constructor () {
    this.uri = '/auth'
  }

  login ({ username, password }) {
    return Client().post('login', { username, password })
  }

  logout () {
    return Client().post('logout')
  }
}

export default new AuthService()
