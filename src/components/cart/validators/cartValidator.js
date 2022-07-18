const cartService = require('../services/cartService');

class Cart {
    validateQty(qty) {
        return {
            isValid: qty > 0
        }
    }

    async validateStock(id_cart, id_prod, qty, method, addMaxAvailable) {
        return await cartService.validateStock(id_cart, id_prod, qty, method, addMaxAvailable); 
    }
}

module.exports = new Cart();