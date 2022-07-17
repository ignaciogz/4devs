const { brandsDao } = require('../../../models/daos');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Brands {
    constructor() {
        this.storage = brandsDao;
    }

    async getAll() {
        try {
            const brands = await this.storage.getAll();
            return brands;
        } catch (error) {
            loggerWinston.error(`BrandsServices -> Ejecutando: 'getAll()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Brands();