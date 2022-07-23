import RequestService from './requestService'

class ProductService {
  static API_URL = `${RequestService.SERVER}/api/products`

  static async getAll() {
    try {
      return await RequestService.GET(`${ProductService.API_URL}`)
    } catch (err) {
      console.log(err)
    }
  }

  static async getID(id) {
    try {
      return await RequestService.GET(`${ProductService.API_URL}/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

export default ProductService
