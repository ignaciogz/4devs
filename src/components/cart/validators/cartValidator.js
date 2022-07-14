const cartService = require('../services/cartService');

class Cart {
    validateQty(qty) {
        return {
            isValid: qty > 0
        }
    }

    async validateStock(id_cart, id_prod, qty, method) {
        return await cartService.validateStock(id_cart, id_prod, qty, method); 
    }
}

module.exports = new Cart();