const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const categoriesSchema = require('../../schemas/sql/categories');
const { DB } = require('../../../config');

class CategoriesDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("categories", DB.mariaDB, categoriesSchema);
    }

    async desconectar() {

    }
}

module.exports = CategoriesDaoMariaDB;