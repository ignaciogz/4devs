const MongoDBContainer = require('../../containers/MongoDBContainer');
const ordersSchema = require('../../schemas/nosql/orders');

class OrdersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('orders', ordersSchema);
    }

    async getByEmail(email) {
        try {
            const result = await this.model.find({"client.email": email});
            return result;
        } catch (error) {
            console.log("Error getByUserName() ", error);
        }
    }

    async desconectar() {

    }
}

module.exports = OrdersDaoMongoDB;