const { categoriesDao } = require('../../../models/daos');
const loggerWinston = require("../../../utils/logger");

class Categories {
    constructor() {
        this.storage = categoriesDao;
    }

    async getAll() {
        try {
            const categories = await this.storage.getAll();
            return categories;
        } catch (error) {
            loggerWinston.error(`CategoriesService -> Ejecutando: 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const category = await this.storage.getByID(id);
            return category;
        } catch (error) {
            loggerWinston.error(`CategoriesService -> Ejecutando: 'getID()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Categories();