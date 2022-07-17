const MongoDBContainer = require('../../containers/MongoDBContainer');
const brandsSchema = require('../../schemas/nosql/brands');

class BrandsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('brands', brandsSchema);
    }

    async desconectar() {

    }
}

module.exports = BrandsDaoMongoDB;