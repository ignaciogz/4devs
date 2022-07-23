import RequestService from './requestService'

class AuthService {
  static API_URL = `${RequestService.SERVER}/api/auth`

  static async checkLoggedIn() {
    try {
      return await RequestService.GET(`${AuthService.API_URL}`)
    } catch (err) {
      console.log(err)
    }
  }

  static async login({ username, password }) {
    try {
      const data = {
        email: username,
        password,
      }

      return await RequestService.POST(`${AuthService.API_URL}/login`, data)
    } catch (err) {
      console.log(err)
    }
  }

  static async logout() {
    try {
      return await RequestService.GET(`${AuthService.API_URL}/logout`)
    } catch (err) {
      console.log(err)
    }
  }

  static async register(formData) {
    try {
      return await RequestService.POST(`${AuthService.API_URL}/register`, formData, true)
    } catch (err) {
      console.log(err)
    }
  }
}

export default AuthService
