const ordersService = require('../services/ordersService');
const loggerWinston = require("../../../utils/logger");

class Orders {
    async getAll(req, res, next) {
        try {
            const orders = await ordersService.getAll();

            res.json({ 
                success: true,
                data: { orders } 
            });
        } catch (error) {
            loggerWinston.error(`OrdersController -> 'getAll()' || Error: ${error.message}`)
        }
    };

    async getID(req, res, next) {
        try {
            const { id } = req.params;
            const order = await ordersService.getID(id);
    
            res.json({ 
                success: true,
                data: { order } 
            });
        } catch (error) {
            loggerWinston.error(`OrdersController -> 'getID()' || Error: ${error.message}`)
        }
    };

    async add(req, res, next) {
        try {
            const newOrder = req.body;
    
            const id = await ordersService.add(newOrder);
    
            res.json({ 
                success: true,
                data: { id }
            });   
        } catch (error) {
            loggerWinston.error(`OrdersController -> 'add()' || Error: ${error.message}`)
        }
    };

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const modifiedOrder = req.body;
            
            await ordersService.update(parseInt(id), modifiedOrder);
    
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`OrdersController -> 'update()' || Error: ${error.message}`)
        }
    };
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
        
            await ordersService.delete(id);
            
            res.json({ 
                success: true
            });   
        } catch (error) {
            loggerWinston.error(`OrdersController -> 'delete()' || Error: ${error.message}`)
        }
    };

    async getUserOrders(req, res, next) {
        try {
            const { email } = req.user;
            const orders = await ordersService.getByEmail(email);
    
            res.json({ 
                success: true,
                data: { orders } 
            });
        } catch (error) {
            loggerWinston.error(`OrdersController -> 'getUserOrders()' || Error: ${error.message}`)
        }
    };
}

module.exports = new Orders();