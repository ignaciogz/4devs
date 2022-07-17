const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const brandsSchema = require('../../schemas/sql/brands');
const { DB } = require('../../../config');

class BrandsDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("brands", DB.mariaDB, brandsSchema);
    }

    async desconectar() {

    }
}

module.exports = BrandsDaoMariaDB;