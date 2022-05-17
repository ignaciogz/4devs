const { productsDao } = require('../../../utils/daos');

class Auth {
    constructor() {
        this.storage = productsDao;
    }

    async getAll() {
        try {
            const products = await this.storage.getAll();
            return products;   
        } catch (error) {
            console.log("Error getAll() ", error);
        }
    }

    async getID(id) {
        try {
            const product = await this.storage.getByID(id);
            return product;   
        } catch (error) {
            console.log("Error getID() ", error);
        }
    }

    async add(newProduct) {
        try {
            const productID = await this.storage.save(newProduct);
            return productID;   
        } catch (error) {
            console.log("Error add() ", error);
        }
    }

    async update(id, modifiedProduct) {
        try {
            await this.storage.update(id, modifiedProduct);    
        } catch (error) {
            console.log("Error update() ", error);
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);   
        } catch (error) {
            console.log("Error delete() ", error);
        }
    }

    async productIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            console.log("Error productIDExist() ", error);
        }
    }
}

module.exports = new Auth();