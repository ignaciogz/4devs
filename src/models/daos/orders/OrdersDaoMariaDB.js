const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const ordersSchema = require('../../schemas/sql/orders');
const { DB } = require('../../../config');
const loggerWinston = require("../../../utils/logger");

class OrdersDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("orders", DB.mariaDB, ordersSchema);
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);
            
            const finalResult = {
                ...result,
                client: JSON.parse(result.client),
                items: JSON.parse(result.items)
            }

            return finalResult;
        } catch (error) {
            loggerWinston.error(`OrdersDaoMariaDB -> 'getById()' || Error: ${error.message}`)
        }
    }

    async getAll() {
        try {
            const result = await super.getAll();

            const finalResult = result.map(element => {
                return {
                    ...element,
                    client: JSON.parse(element.client),
                    items: JSON.parse(element.items)
                }
            });

            return finalResult;
        } catch (error) {
            loggerWinston.error(`OrdersDaoMariaDB -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async save(data) {
        try {
            data.client = this.#toJSON(data.client);
            data.items = this.#toJSON(data.items);
            return await super.save(data);
        } catch (error) {
            loggerWinston.error(`OrdersDaoMariaDB -> 'save()' || Error: ${error.message}`)
        }
    }

    async update(id, data) {
        try {
            data.client = this.#toJSON(data.client);
            data.items = this.#toJSON(data.items);
            await super.update(id, data);
        } catch (error) {
            loggerWinston.error(`OrdersDaoMariaDB -> 'update()' || Error: ${error.message}`)
        }
    }

    async desconectar() {

    }
}

module.exports = OrdersDaoMariaDB;