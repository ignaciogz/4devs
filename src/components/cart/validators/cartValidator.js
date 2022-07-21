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

    async validateStocks(id_cart) {
        return await cartService.validateStocks(id_cart);
    }
}

module.exports = new Cart();