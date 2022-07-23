import RequestService from './requestService'

class BrandService {
  static API_URL = `${RequestService.SERVER}/api/brands`

  static async getAll() {
    try {
      return await RequestService.GET(`${BrandService.API_URL}`)
    } catch (err) {
      console.log(err)
    }
  }
}

export default BrandService
