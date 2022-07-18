const { cartsDao } = require('../../../models/daos');
const { ArrayTools } = require('../../../utils/tools');
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

    async update(id, id_prod, qty) {
        const cart = await this.getID(id);
        const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
    
        let itemToUpdate = cart.items[itemIndex];
        itemToUpdate.qty = qty;
    
        cart.items.splice(itemIndex, 1, itemToUpdate);

        await this.#update(id, cart);
    }

    async delete(id, id_prod) {
        try {
            const cart = await this.getID(id);
            
            const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
            cart.items.splice(itemIndex, 1);
            
            await this.#update(id, cart);
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'delete()' || Error: ${error.message}`)
        }
    }

    async #update(id, modifiedCart) {
        try {
            await this.storage.update(id, modifiedCart);
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: '#update()' || Error: ${error.message}`)
        }       
    }

    async validateStock(id, id_prod, qty, method, addMaxAvailable) {
        try {
            if(method === "POST") {
                const cart = await this.getID(id);
                const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
    
                if(itemIndex !== -1) {
                    const item = cart.items[itemIndex];
    
                    qty += item.qty;
                }
            }
    
            const checkStock = await productsService.checkStock(id_prod, qty);
    
            if(!checkStock.isValid && addMaxAvailable) {
                await this.update(id, id_prod, checkStock.value);
            }
            
            return checkStock;
        } catch (error) {
            loggerWinston.error(`CartServices -> Ejecutando: 'validateStock()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Cart();