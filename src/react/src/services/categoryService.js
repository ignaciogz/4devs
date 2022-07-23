import RequestService from './requestService'

class CategoryService {
  static API_URL = `${RequestService.SERVER}/api/categories`

  static async getAll() {
    try {
      return await RequestService.GET(`${CategoryService.API_URL}`)
    } catch (err) {
      console.log(err)
    }
  }
}

export default CategoryService
