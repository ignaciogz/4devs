const fs = require('fs');
const { ArrayTools, TimeTools } = require('../../utils/tools');
const loggerWinston = require("../../utils/logger");

class FSContainer {
    constructor(fileName) {
        this.fileName = fileName;
        
        this.#init();
    }

    async #init() {
        try {
            if (!fs.existsSync(this.fileName)) {
                this.lastID = 0;
                const contentJSON = this.#initialContent();
                fs.writeFileSync(this.fileName, contentJSON, 'utf-8');
            } else {
                this.lastID = await this.getAll().then(content => {
                    const elementsQty = content.length;
        
                    if (elementsQty > 0) {
                        const lastElement = content[elementsQty-1];
                        return lastElement.id;
                    }
        
                    return 0; 
                });
            }
        } catch (error) {
            loggerWinston.error(`FSContainer -> '#init()' || Error: ${error.message}`)
        }
    }

    #createContent(elements) {
        return this.#toJSON({
            elements
        });
    }

    #initialContent() {
        return this.#createContent(new Array());
    }

    #getNewID() {
        return ++this.lastID;
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const elements = await this.getAll();

            const index = ArrayTools.getIndexOfElementID(elements, id);
            return elements[index];
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'getByID()' || Error: ${error.message}`)
        }
    }

    async getAll() {
        try {
            let content = await fs.promises.readFile(this.fileName, 'utf-8');
            content = JSON.parse(content);

            return content.elements;
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async save(data) {
        try {
            data.id = this.#getNewID();
            data.timestamp = TimeTools.getTimestamp();

            const elements = await this.getAll();
            elements.push(data);

            const contentJSON = this.#createContent(elements, data.id);
            await fs.promises.writeFile(this.fileName, contentJSON);

            return data.id;
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'save()' || Error: ${error.message}`)
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();
            
            const elements = await this.getAll();
            const index = ArrayTools.getIndexOfElementID(elements, id);
            elements.splice(index, 1, data);

            const contentJSON = this.#createContent(elements, id);
            await fs.promises.writeFile(this.fileName, contentJSON);
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'update()' || Error: ${error.message}`)
        }
    }

    async deleteById(id) {
        try {
            const elements = await this.getAll();
            const index = ArrayTools.getIndexOfElementID(elements, id);

            elements.splice(index, 1);

            const contentJSON = this.#createContent(elements);
            await fs.promises.writeFile(this.fileName, contentJSON);
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'deleteById()' || Error: ${error.message}`)
        }
        
    }

    async deleteAll() {
        try {
            const contentJSON = this.#initialContent();
            await fs.promises.writeFile(this.fileName, contentJSON);
            this.lastID = 0;
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'deleteAll()' || Error: ${error.message}`)
        }
    }

    async elementExist(id) {
        try {
            const elements = await this.getAll();
            
            const index = ArrayTools.getIndexOfElementID(elements, id);
            return (index !== -1);
        } catch (error) {
            loggerWinston.error(`FSContainer -> 'elementExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = FSContainer;