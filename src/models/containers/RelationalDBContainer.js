const knex = require("knex");
const { ArrayTools, TimeTools } = require('../../utils/tools');
const loggerWinston = require("../../utils/logger");

class RelationalDBContainer {
    constructor(table, config, schema) {
        this.table = table;
        this.client = knex(config);
        this.schema = schema;

        this.#init();
    }

    async #init() {
        try {
            const tableExist = await this.client.schema.hasTable(this.table);
            if(!tableExist) {
                await this.client.schema.createTable(this.table, table => this.schema(table));
            } else {
                console.log(`Table "${this.table}" already exist !`);
            }
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> '#init()' || Error: ${error.message}`)
        }
    }

    async getByID(id) {
        try {
            const result = await this.client.from(this.table).where("id", id).limit(1);
            return result.shift();   
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'getById()' || Error: ${error.message}`)
        }
    }

    async getAll() {
        try {
            const result = await this.client.from(this.table);
            return result;
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async save(data) {
        try {
            data.timestamp = TimeTools.getTimestamp();

            const insertID = await this.client.from(this.table).insert(data, 'id');

            return insertID.shift();
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'save()' || Error: ${error.message}`)
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();
            
            await this.client.from(this.table).where("id", id).update(data);
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'update()' || Error: ${error.message}`)
        }
    }

    async deleteById(id) {
        try {
            await this.client.from(this.table).where("id", id).del();
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'deleteById()' || Error: ${error.message}`)
        }
        
    }

    async deleteAll() {
        try {
            await this.client.from(this.table).del();
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'deleteAll()' || Error: ${error.message}`)
        }
    }

    async elementExist(id) {
        try {
            const elements = await this.getAll();
            
            const index = ArrayTools.getIndexOfElementID(elements, id);
            return (index !== -1);
        } catch (error) {
            loggerWinston.error(`RelationalDBContainer -> 'elementExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = RelationalDBContainer;