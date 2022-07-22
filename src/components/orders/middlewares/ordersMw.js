const ordersService = require('../services/ordersService');

class Orders {
    async orderExist(req, res ,next) {
        const { id } = req.params;
    
        const orderExist = await ordersService.orderIDExist(id)
        orderExist ? next() : res.json({
            success: false,
            error: {
                code: '-2',
                description: `OrderID: ${id} Not Found`
            },
        });
    }
}

module.exports = new Orders();