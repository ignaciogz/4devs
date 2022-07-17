const MemoryContainer = require('../../containers/MemoryContainer');

class CategoriesDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async desconectar() {

    }
}

module.exports = CategoriesDaoMemory;