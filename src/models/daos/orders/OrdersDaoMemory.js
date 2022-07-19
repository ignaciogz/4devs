const MemoryContainer = require('../../containers/MemoryContainer');

class OrdersDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async desconectar() {

    }
}

module.exports = OrdersDaoMemory;