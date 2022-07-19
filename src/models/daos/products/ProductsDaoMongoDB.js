const MongoDBContainer = require('../../containers/MongoDBContainer');
const productsSchema = require('../../schemas/nosql/products');

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
            console.log("Error getByID() on ProductsDaoMongoDB", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMongoDB;