const MongoDBContainer = require('../../containers/MongoDBContainer');
const productsSchema = require('../../schemas/nosql/products');
const loggerWinston = require("../../../utils/logger");

const ProductsDto = require('../../dtos/ProductsDto');

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('products', productsSchema);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            const dto = new ProductsDto(result);
            
            return dto;
        } catch (error) {
            loggerWinston.error(`ProductsDaoMongoDB -> 'getByID()' || Error: ${error.message}`)
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMongoDB;