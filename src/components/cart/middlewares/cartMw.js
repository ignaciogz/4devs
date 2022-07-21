const cartValidator = require('../validators/cartValidator');

class Cart {
    async verifyStock(req, res, next) {
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
    }

    async verifyStocks(req, res, next) {
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
    }
}

module.exports = new Cart();