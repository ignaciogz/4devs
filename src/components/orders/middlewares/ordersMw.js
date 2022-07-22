const ordersService = require('../services/ordersService');
const loggerWinston = require("../../../utils/logger");

class Orders {
    async orderExist(req, res ,next) {
        try {
            const { id } = req.params;
    
            const orderExist = await ordersService.orderIDExist(id)
            orderExist ? next() : res.json({
                success: false,
                error: {
                    code: '-2',
                    description: `OrderID: ${id} Not Found`
                },
            });
        } catch (error) {
            loggerWinston.error(`OrdersMw -> 'orderExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Orders();