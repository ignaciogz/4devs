const { productsDao } = require('../../../models/daos');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Products {
    constructor() {
        this.storage = productsDao;
    }

    async getAll() {
        try {
            const products = await this.storage.getAll();
            return products;
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const product = await this.storage.getByID(id);
            return product;
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'getID()' || Error: ${error.message}`)
        }
    }

    async add(newProduct) {
        try {
            newProduct.rating = 3;
            const productID = await this.storage.save(newProduct);
            return productID;
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'add()' || Error: ${error.message}`)
        }
    }

    async update(id, modifiedProduct) {
        try {
            await this.storage.update(id, modifiedProduct);    
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'update()' || Error: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);    
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'delete()' || Error: ${error.message}`)
        }
    }

    async checkStock(id, qty) {
        try {
            let product = await this.getID(id);
            
            return {
                isValid: product.stock >= qty,
                value: product.stock
            }
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'checkStock()' || Error: ${error.message}`)
        }
    }

    async productIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            loggerWinston.error(`ProductsService -> Ejecutando: 'productIDExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Products();