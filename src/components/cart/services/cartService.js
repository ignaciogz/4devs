const { cartsDao } = require('../../../models/daos');
const { ArrayTools, TimeTools } = require('../../../utils/tools');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

const productsService = require('../../products/services/productsService');

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
            loggerWinston.error(`CartServices -> Ejecutando: 'create()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const cart = await this.storage.getByID(id);
            
            return cart;
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'getID()' || Error: ${error.message}`)
        }
    }

    async add(id, id_prod, qty) {
        try {
            const cart = await this.getID(id);
            const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
            
            if(itemIndex !== -1) {
                let itemToUpdate = cart.items[itemIndex];
                itemToUpdate.qty += qty;

                cart.items.splice(itemIndex, 1, itemToUpdate);
            } else {
                const item = {
                    id: id_prod,
                    qty
                }

                cart.items.push(item);
            }

            await this.#update(id, cart);
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'add()' || Error: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'delete()' || Error: ${error.message}`)
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            const cart = await this.getID(id);
            
            const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
            cart.items.splice(itemIndex, 1);
            
            await this.#update(id, cart);
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'deleteProduct()' || Error: ${error.message}`)
        }
    }

    async getProductsDetails(cart) {
        try {
            let details = []

            for (const item of cart.items) {
                let product = await productsService.getID(item.id);
                
                details.push({
                    product,
                    qty: item.qty
                });
            }

            return details;
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'getID()' || Error: ${error.message}`)
        }
    }

    async #update(id, modifiedCart) {
        try {
            await this.storage.update(id, modifiedCart);
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: '#update()' || Error: ${error.message}`)
        }       
    }
}

module.exports = new Cart();