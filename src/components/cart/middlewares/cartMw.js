const cartValidator = require('../validators/cartValidator');

class Cart {
    async verifyAddAndUpdate(req, res, next) {
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
}

module.exports = new Cart();