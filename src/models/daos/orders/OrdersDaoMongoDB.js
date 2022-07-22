const MongoDBContainer = require('../../containers/MongoDBContainer');
const ordersSchema = require('../../schemas/nosql/orders');
const loggerWinston = require("../../../utils/logger");

class OrdersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('orders', ordersSchema);
    }

    async getByEmail(email) {
        try {
            const result = await this.model.find({"client.email": email});
            return result;
        } catch (error) {
            loggerWinston.error(`OrdersDaoMongoDB -> 'getByUserName()' || Error: ${error.message}`)
        }
    }

    async desconectar() {

    }
}

module.exports = OrdersDaoMongoDB;