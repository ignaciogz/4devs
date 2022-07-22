const cartService = require('../services/cartService');
const loggerWinston = require("../../../utils/logger");

class Cart {
    async getAll(req, res, next) {
        try {
            const carts = await cartService.getAll();

            res.json({ 
                success: true,
                data: { carts } 
            });
        } catch (error) {
            loggerWinston.error(`CartController -> 'getAll()' || Error: ${error.message}`)
        }
    };

    async getUserCart(req, res, next) {
        try {
            const { id_cart } = req.user;
    
            const cart = await cartService.getID(id_cart);
            const cartWithProductsDetails = await cartService.getProductsDetails(cart);
    
            res.json({ 
                success: true,
                data: { cart: cartWithProductsDetails } 
            });   
        } catch (error) {
            loggerWinston.error(`CartController -> 'getUserCart()' || Error: ${error.message}`)
        }
    };

    async addItem(req, res, next) {
        try {
            const { id_cart } = req.user;
            const { id_prod } = req.params;
            const { qty } = req.body;
            
            await cartService.addItem(id_cart, id_prod, qty);
            
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`CartController -> 'addItem()' || Error: ${error.message}`)
        }
    };

    async updateItem(req, res, next) {
        try {
            const { id_cart } = req.user;
            const { id_prod } = req.params;
            const { qty } = req.body;
            
            await cartService.updateItem(id_cart, id_prod, qty);
            
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`CartController -> 'updateItem()' || Error: ${error.message}`)
        }
    };
    
    async deleteItem(req, res, next) {
        try {
            const { id_cart } = req.user;
            const { id_prod } = req.params;
    
            await cartService.delete(id_cart, id_prod);
    
            res.json({ 
                success: true,
            });   
        } catch (error) {
            loggerWinston.error(`CartController -> 'deleteItem()' || Error: ${error.message}`)
        }
    };

    async checkout(req, res, next) {
        try {
            const { email, name, id_cart } = req.user;
            const client = { email, name }
            
            const id_order = await cartService.checkout(id_cart, client);
    
            res.json({ 
                success: true,
                data: { id: id_order }
            });   
        } catch (error) {
            loggerWinston.error(`CartController -> 'checkout()' || Error: ${error.message}`)
        }
    };
}

module.exports = new Cart();