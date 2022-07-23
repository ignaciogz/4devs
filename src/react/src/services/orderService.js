import RequestService from './requestService'

class OrderService {
  static API_URL = `${RequestService.SERVER}/api/orders`

  static async getID(id) {
    try {
      return await RequestService.GET(`${OrderService.API_URL}/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  static async getUserOrders() {
    try {
      return await RequestService.GET(`${OrderService.API_URL}/all/user`)
    } catch (err) {
      console.log(err)
    }
  }
}

export default OrderService
