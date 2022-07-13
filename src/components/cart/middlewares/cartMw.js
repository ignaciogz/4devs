const cartValidator = require('../validators/cartValidator');

class Cart {
    async verifyAddAndUpdate(req, res, next) {
        const { id_cart } = req.user;
        const { id_prod } = req.params;
        const { qty } = req.body;
        const method = req.method;

        const qtyIsValid = cartValidator.validateQty(qty);
        const stockIsValid = await cartValidator.validateStock(id_cart, id_prod, qty, method);
        
        if(qtyIsValid && stockIsValid) {
            next();
        }
        
        if(!qtyIsValid) {
            res.json({
                success: false,
                error: {
                    code: '-1',
                    description: "Quantity must be > 0"
                }
            });
        }
        
        if(!stockIsValid) {
            res.json({
                success: false,
                error: {
                    code: '-1',
                    description: "Insufficient stock"
                }
            });
        }
    }
}

module.exports = new Cart();