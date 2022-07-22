const cartValidator = require('../validators/cartValidator');
const loggerWinston = require("../../../utils/logger");

class Cart {
    async verifyStock(req, res, next) {
        try {
            const { id_cart } = req.user;
            const { id_prod } = req.params;
            const { qty, addMaxAvailable } = req.body;
            const method = req.method;
    
            const checkQty = cartValidator.validateQty(qty);
            const checkStock = await cartValidator.validateStock(id_cart, id_prod, qty, method, addMaxAvailable);
            
            if(checkQty.isValid && checkStock.isValid) {
                next();
            }
            
            if(!checkQty.isValid) {
                res.json({
                    success: false,
                    error: {
                        code: '-1',
                        description: "Quantity must be > 0"
                    }
                });
            }
            
            if(!checkStock.isValid) {
                res.json({
                    success: false,
                    error: {
                        code: '-1',
                        description: "Insufficient stock",
                        value: checkStock.value
                    }
                });
            }
        } catch (error) {
            loggerWinston.error(`CartMw -> 'verifyStock()' || Error: ${error.message}`)
        }
    }

    async verifyStocks(req, res, next) {
        try {
            const { id_cart } = req.user;

            const checkStocks = await cartValidator.validateStocks(id_cart);
            
            if(checkStocks.isValid) {
                next();
            }
            
            if(!checkStocks.isValid) {
                res.json({
                    success: false,
                    error: {
                        code: '-1',
                        description: checkStocks.value.length == 1 ? "Insufficient stock of a product" : "Insufficient stock of some products",
                        value: checkStocks.value
                    }
                });
            }
        } catch (error) {
            loggerWinston.error(`CartMw -> 'verifyStocks()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Cart();