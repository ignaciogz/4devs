const { mongoose } = require('../../config/mongoDB');
const { ArrayTools, TimeTools } = require('../../utils/tools');
const loggerWinston = require("../../utils/logger");

class MongoDBContainer {
    constructor(modelName, schema) {
        const schemaModel = new mongoose.Schema(schema);
        this.model = new mongoose.model(modelName, schemaModel);
    }

    async #getNewID() {
        try {
            let lastID = await this.getAll().then(content => {
                const elementsQty = content.length; 
    
                if (elementsQty > 0) {
                    const lastElement = content[elementsQty-1];
                    return lastElement.id;
                }
    
                return 0;
            });
    
            return ++lastID;   
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> '#getNewID()' || Error: ${error.message}`)
        }
    }

    async getByID(id) {
        try {
            const result = await this.model.find({id}, {"_id":0}).limit(1);
            return result.shift();
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'getById()' || Error: ${error.message}`)
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({}, {"_id":0});
            return result;
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async save(data) {
        try {
            data.id = await this.#getNewID();
            data.timestamp = TimeTools.getTimestamp();

            await this.model.create(data);

            return data.id;
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'save()' || Error: ${error.message}`)
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();

            await this.model.updateOne({id}, data);
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'update()' || Error: ${error.message}`)
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteMany({id});
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'deleteById()' || Error: ${error.message}`)
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({});
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'deleteAll()' || Error: ${error.message}`)
        }
    }

    async elementExist(id) {
        try {
            const elements = await this.getAll();
            
            const index = ArrayTools.getIndexOfElementID(elements, id);
            return (index !== -1);
        } catch (error) {
            loggerWinston.error(`MongoDBContainer -> 'elementExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = MongoDBContainer;