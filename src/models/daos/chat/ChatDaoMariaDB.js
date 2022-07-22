const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const chatSchema = require('../../schemas/sql/chat');
const { DB } = require('../../../config');
const loggerWinston = require("../../../utils/logger");

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("chat", DB.mariaDB, chatSchema);
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);
            
            let dto = new ChatDto(result);
            dto.autor = JSON.parse(dto.autor);
            
            return dto;
        } catch (error) {
            loggerWinston.error(`ChatDaoMariaDB -> 'getById()' || Error: ${error.message}`)
        }
    }

    async getAll() {
        try {
            const results = await super.getAll();

            const dtos = results.map(result => {
                let dto = new ChatDto(result);
                dto.autor = JSON.parse(dto.autor);
                
                return dto;
            });

            return dtos;
        } catch (error) {
            loggerWinston.error(`ChatDaoMariaDB -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async save(data) {
        try {
            data.autor = this.#toJSON(data.autor);
            return await super.save(data);
        } catch (error) {
            loggerWinston.error(`ChatDaoMariaDB -> 'save()' || Error: ${error.message}`)
        }
    }

    async update(id, data) {
        try {
            data.autor = this.#toJSON(data.autor);
            await super.update(id, data);
        } catch (error) {
            loggerWinston.error(`ChatDaoMariaDB -> 'update()' || Error: ${error.message}`)
        }
    }
    
    async desconectar() {

    }
}

module.exports = ChatDaoMariaDB;