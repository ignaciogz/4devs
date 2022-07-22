const MemoryContainer = require('../../containers/MemoryContainer');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async getByID(id) {
        const result = super.getByID(id);

        return new ChatDto(result);
    }

    async getAll() {
        const results = super.getAll();

        const dtos = results.map(result => {
            return new ChatDto(result);
        });

        return dtos;
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMemory;