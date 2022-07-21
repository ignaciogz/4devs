const { brandsDao } = require('../../../models/daos');
const loggerWinston = require("../../../utils/logger");

class Brands {
    constructor() {
        this.storage = brandsDao;
    }

    async getAll() {
        try {
            const brands = await this.storage.getAll();
            return brands;
        } catch (error) {
            loggerWinston.error(`BrandsService -> Ejecutando: 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const brand = await this.storage.getByID(id);
            return brand;
        } catch (error) {
            loggerWinston.error(`BrandsService -> Ejecutando: 'getID()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Brands();