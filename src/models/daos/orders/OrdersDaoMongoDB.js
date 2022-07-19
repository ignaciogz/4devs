const MongoDBContainer = require('../../containers/MongoDBContainer');
const ordersSchema = require('../../schemas/nosql/orders');

class OrdersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('orders', ordersSchema);
    }

    async desconectar() {

    }
}

module.exports = OrdersDaoMongoDB;