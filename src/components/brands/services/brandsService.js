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
            loggerWinston.error(`BrandsService -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const brand = await this.storage.getByID(id);
            return brand;
        } catch (error) {
            loggerWinston.error(`BrandsService -> 'getID()' || Error: ${error.message}`)
        }
    }

    async add(newBrand) {
        try {
            const brandID = await this.storage.save(newBrand);
            return brandID;
        } catch (error) {
            loggerWinston.error(`BrandsService -> 'add()' || Error: ${error.message}`)
        }
    }

    async update(id, modifiedBrand) {
        try {
            await this.storage.update(id, modifiedBrand);    
        } catch (error) {
            loggerWinston.error(`BrandsService -> 'update()' || Error: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);    
        } catch (error) {
            loggerWinston.error(`BrandsService -> 'delete()' || Error: ${error.message}`)
        }
    }

    async brandIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            loggerWinston.error(`BrandsService -> 'brandIDExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Brands();