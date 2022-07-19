const MongoDBContainer = require('../../containers/MongoDBContainer');
const chatSchema = require('../../schemas/nosql/chat');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("chat", chatSchema);
    }

    async getAll() {
        try {
            const results = await super.getAll();

            const dtos = results.map(result => {
                return new ChatDto(result);
            });

            return dtos;
        } catch (error) {
            console.log("Error getAll() on ChatDaoMongoDB", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMongoDB;