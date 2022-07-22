const MongoDBContainer = require('../../containers/MongoDBContainer');
const usersSchema = require('../../schemas/nosql/users');
const loggerWinston = require("../../../utils/logger");

class UsersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("users", usersSchema);
    }

    async getByEmail(email) {
        try {
            const result = await this.model.find({email}).limit(1);
            return result.shift();
        } catch (error) {
            loggerWinston.error(`UsersDaoMongoDB -> 'getByUserName()' || Error: ${error.message}`)
        }
    }

    async desconectar() {

    }
}

module.exports = UsersDaoMongoDB;