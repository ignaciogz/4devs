const { categoriesDao } = require('../../../models/daos');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Categories {
    constructor() {
        this.storage = categoriesDao;
    }

    async getAll() {
        try {
            const categories = await this.storage.getAll();
            return categories;
        } catch (error) {
            loggerWinston.error(`CategoriesServices -> Ejecutando: 'getAll()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Categories();