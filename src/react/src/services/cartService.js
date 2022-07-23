import RequestService from './requestService'

class CartService {
  static API_URL = `${RequestService.SERVER}/api/cart`

  static async add(id_prod, qty, addMaxAvailable) {
    try {
      const data = {
        qty: Number(qty),
        addMaxAvailable,
      }

      return await RequestService.POST(`${CartService.API_URL}/${id_prod}`, data)
    } catch (err) {
      console.log(err)
    }
  }

  static async checkout() {
    try {
      return await RequestService.GET(`${CartService.API_URL}/checkout`)
    } catch (err) {
      console.log(err)
    }
  }

  static async getCart() {
    try {
      return await RequestService.GET(`${CartService.API_URL}`)
    } catch (err) {
      console.log(err)
    }
  }

  static async update(id_prod, qty, addMaxAvailable) {
    try {
      const data = {
        qty: Number(qty),
        addMaxAvailable,
      }

      return await RequestService.PUT(`${CartService.API_URL}/${id_prod}`, data)
    } catch (err) {
      console.log(err)
    }
  }

  static async remove(id_prod) {
    try {
      return await RequestService.DELETE(`${CartService.API_URL}/${id_prod}`, null)
    } catch (err) {
      console.log(err)
    }
  }
}

export default CartService
