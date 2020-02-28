import Client from '../utils/client'

class DashboardService {
  getUsers () {
    return Client().get(`users`)
  }
  delUsers (payload) {
    return Client().delete(`users_del`)
  }
}

export default new DashboardService()
