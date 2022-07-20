const ordersService = require('../services/ordersService');

class Orders {
    async getID(req, res, next) {
        const { id } = req.params;
        const order = await ordersService.getID(id);

        res.json({ 
            success: true,
            data: { order } 
        });
    };

    async getUserOrders(req, res, next) {
        const { email } = req.user;
        const orders = await ordersService.getByEmail(email);

        res.json({ 
            success: true,
            data: { orders } 
        });
    };
}

module.exports = new Orders();