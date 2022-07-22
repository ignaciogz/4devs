const { ordersDao } = require('../../../models/daos');
const { ObjectTools } = require('../../../utils/tools');
const loggerWinston = require("../../../utils/logger");

const brandsService = require('../../brands/services/brandsService');
const categoriesService = require('../../categories/services/categoriesService');
const productsService = require('../../products/services/productsService');

class Orders {
    constructor() {
        this.storage = ordersDao;
    }

    async #initOrder(client) {
        return {
            client,
            items: []
        }
    }

    async create(clientData) {
        try {
            const newOrder = await this.#initOrder(clientData);
            const orderID = await this.storage.save(newOrder);

            return orderID;
        } catch (error) {
            loggerWinston.error(`OrdersService -> 'create()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const order = await this.storage.getByID(id);
            
            return order;
        } catch (error) {
            loggerWinston.error(`OrdersService -> 'getID()' || Error: ${error.message}`)
        }
    }

    async add(id, id_prod, qty) {
        try {
            const order = await this.getID(id);
            const item = await productsService.getID(id_prod);

            await productsService.update(id_prod, {
                ...item,
                stock: item.stock - qty
            });

            const brand = await brandsService.getID(item.brand);
            const category = await categoriesService.getID(item.category);
            
            item = ObjectTools.removeAllPropertiesExcept(item, ["id", "name", "price", "img", "stock", "timestamp"]);
            item.brand = brand.name;
            item.category = category.name;
            item.qty = qty;

            order.items.push(item);

            await this.#update(id, order);
        } catch (error) {
            loggerWinston.error(`OrdersService -> 'add()' || Error: ${error.message}`)
        }
    }

    async addAll(id, cart) {
        try {
            const order = await this.getID(id);
            
            for (const cartItem of cart.items) {
                let item = await productsService.getID(cartItem.id);
                
                let modifiedProduct = {
                    ...item,
                    stock: item.stock - cartItem.qty
                }

                await productsService.update(item.id, modifiedProduct);

                let brand = await brandsService.getID(item.brand);
                let category = await categoriesService.getID(item.category);
                
                item = ObjectTools.removeAllPropertiesExcept(item, ["id", "name", "price", "img", "stock", "timestamp"]);
                item.brand = brand.name;
                item.category = category.name;
                item.qty = cartItem.qty;
                
                order.items.push(item);
            }

            await this.#update(id, order);

            return order;
        } catch (error) {
            loggerWinston.error(`OrdersService -> 'addAll()' || Error: ${error.message}`)
        }
    }

    async #update(id, modifiedOrder) {
        try {
            await this.storage.update(id, modifiedOrder);
        } catch (error) {
            loggerWinston.error(`OrdersService -> '#update()' || Error: ${error.message}`)
        }       
    }

    async getByEmail(email) {
        try {
            const user = await this.storage.getByEmail(email);
            return user;
        } catch (error) {
            loggerWinston.error(`OrdersService -> 'getByEmail()' || Error: ${error.message}`)
        }
    }

    async orderIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            loggerWinston.error(`OrdersService -> 'orderIDExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Orders();