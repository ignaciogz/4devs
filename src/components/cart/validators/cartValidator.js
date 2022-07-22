const cartService = require('../services/cartService');
const loggerWinston = require("../../../utils/logger");

class Cart {
    validateQty(qty) {
        return {
            isValid: qty > 0
        }
    }

    async validateStock(id_cart, id_prod, qty, method, addMaxAvailable) {
        try {
            return await cartService.validateStock(id_cart, id_prod, qty, method, addMaxAvailable);
        } catch (error) {
            loggerWinston.error(`CartValidator -> 'validateStock()' || Error: ${error.message}`)
        }
    }

    async validateStocks(id_cart) {
        try {
            return await cartService.validateStocks(id_cart);
        } catch (error) {
            loggerWinston.error(`CartValidator -> 'validateStocks()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Cart();