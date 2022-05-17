const MongoDBContainer = require('../../containers/MongoDBContainer');
const authSchema = require('../../schemas/nosql/auth');

class AuthDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("auth", authSchema);
    }

    async desconectar() {

    }
}

module.exports = AuthDaoMongoDB;