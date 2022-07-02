const MongoDBContainer = require('../../containers/MongoDBContainer');
const usersSchema = require('../../schemas/nosql/users');

class UsersDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("users", usersSchema);
    }

    async getByEmail(email) {
        try {
            const result = await this.model.find({email}).limit(1);
            return result.shift();
        } catch (error) {
            console.log("Error getByUserName() ", error);
        }
    }

    async desconectar() {

    }
}

module.exports = UsersDaoMongoDB;