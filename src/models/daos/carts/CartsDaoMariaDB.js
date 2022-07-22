const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const cartsSchema = require('../../schemas/sql/carts');
const { DB } = require('../../../config');
const loggerWinston = require("../../../utils/logger");

class CartsDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("carts", DB.mariaDB, cartsSchema);
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);
            
            const finalResult = {
                ...result,
                items: JSON.parse(result.items)
            }

            return finalResult;
        } catch (error) {
            loggerWinston.error(`CartsDaoMariaDB -> 'getById()' || Error: ${error.message}`)
        }
    }

    async getAll() {
        try {
            const result = await super.getAll();

            const finalResult = result.map(element => {
                return {
                    ...element,
                    items: JSON.parse(element.items)
                }
            });

            return finalResult;
        } catch (error) {
            loggerWinston.error(`CartsDaoMariaDB -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async save(data) {
        try {
            data.items = this.#toJSON(data.items);
            return await super.save(data);
        } catch (error) {
            loggerWinston.error(`CartsDaoMariaDB -> 'save()' || Error: ${error.message}`)
        }
    }

    async update(id, data) {
        try {
            data.items = this.#toJSON(data.items);
            await super.update(id, data);
        } catch (error) {
            loggerWinston.error(`CartsDaoMariaDB -> 'update()' || Error: ${error.message}`)
        }
    }

    async desconectar() {

    }
}

module.exports = CartsDaoMariaDB;