import Client from '../utils/client'

class AuthService {
  constructor () {
    this.uri = '/auth'
  }

  login ({ username, password }) {
    return Client().post('admin', { email: username, password })
  }

  logout () {
    return Client().post('logout')
  }
}

export default new AuthService()
