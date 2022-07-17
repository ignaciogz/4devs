const MongoDBContainer = require('../../containers/MongoDBContainer');
const categoriesSchema = require('../../schemas/nosql/categories');

class CategoriesDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('categories', categoriesSchema);
    }

    async desconectar() {

    }
}

module.exports = CategoriesDaoMongoDB;