const { cartsDao } = require('../../../utils/daos');
const { ArrayTools, TimeTools } = require('../../../utils/tools');

class Cart {
    constructor() {
        this.storage = cartsDao;
    }

    async #initCart() {
        return {
            items: []
        }
    }

    async create() {
        try {
            const newCart = await this.#initCart();

            const cartID = await this.storage.save(newCart);
            return cartID;
        } catch (error) {
            console.log("Error create() ", error);
        }
    }

    async getID(id) {
        try {
            const cart = await this.storage.getByID(id);
            return cart;
        } catch (error) {
            console.log("Error getID() ", error);
        }
    }

    async add(id, item) {
        try {
            const cart = await this.getID(id);
        
            item.timestamp = TimeTools.getTimestamp();
            cart.items.push(item);

            await this.#update(id, cart);
        } catch (error) {
            console.log("Error add() ", error);
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);
        } catch (error) {
            console.log("Error delete() ", error);
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            const cart = await this.getID(id);
            
            const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
            cart.items.splice(itemIndex, 1);
            
            await this.#update(id, cart);
        } catch (error) {
            console.log("Error deleteProduct() ", error);
        }
    }

    async #update(id, modifiedCart) {
        try {
            await this.storage.update(id, modifiedCart);
        } catch (error) {
            console.log("Error #update() ", error);
        }       
    }
}

module.exports = new Cart();