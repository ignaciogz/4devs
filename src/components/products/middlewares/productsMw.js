const productsService = require('../services/productsService');
const loggerWinston = require("../../../utils/logger");

class Products {
    async productExist(req, res ,next) {
        try {
            const { id } = req.params;
        
            const productExist = await productsService.productIDExist(id)
            productExist ? next() : res.json({
                success: false,
                error: {
                    code: '-2',
                    description: `ProductID: ${id} Not Found`
                },
            });
        } catch (error) {
            loggerWinston.error(`ProductsMw -> 'productExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Products();