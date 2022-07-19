const FSContainer = require('../../containers/FSContainer');

class OrdersDaoFS extends FSContainer {
    constructor() {
        super("src/data/orders.txt");
    }

    async desconectar() {

    }
}

module.exports = OrdersDaoFS;