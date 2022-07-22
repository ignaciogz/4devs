const { categoriesDao } = require('../../../models/daos');
const loggerWinston = require("../../../utils/logger");

class Categories {
    constructor() {
        this.storage = categoriesDao;
    }

    async getAll() {
        try {
            const categories = await this.storage.getAll();
            return categories;
        } catch (error) {
            loggerWinston.error(`CategoriesService -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const category = await this.storage.getByID(id);
            return category;
        } catch (error) {
            loggerWinston.error(`CategoriesService -> 'getID()' || Error: ${error.message}`)
        }
    }

    async add(newCategory) {
        try {
            const categoryID = await this.storage.save(newCategory);
            return categoryID;
        } catch (error) {
            loggerWinston.error(`CategoriesService -> 'add()' || Error: ${error.message}`)
        }
    }

    async update(id, modifiedCategory) {
        try {
            await this.storage.update(id, modifiedCategory);    
        } catch (error) {
            loggerWinston.error(`CategoriesService -> 'update()' || Error: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);    
        } catch (error) {
            loggerWinston.error(`CategoriesService -> 'delete()' || Error: ${error.message}`)
        }
    }

    async categoryIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            loggerWinston.error(`CategoriesService -> 'categoryIDExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Categories();