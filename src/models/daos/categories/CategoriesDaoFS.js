const FSContainer = require('../../containers/FSContainer');

class CategoriesDaoFS extends FSContainer {
    constructor() {
        super("data/categories.txt");
    }

    async desconectar() {

    }
}

module.exports = CategoriesDaoFS;