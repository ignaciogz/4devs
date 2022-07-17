const FSContainer = require('../../containers/FSContainer');

class BrandsDaoFS extends FSContainer {
    constructor() {
        super("data/brands.txt");
    }

    async desconectar() {

    }
}

module.exports = BrandsDaoFS;