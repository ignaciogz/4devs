const MongoDBContainer = require('../../containers/MongoDBContainer');
const chatSchema = require('../../schemas/nosql/chat');
const loggerWinston = require("../../../utils/logger");

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
            loggerWinston.error(`ChatDaoMongoDB -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMongoDB;