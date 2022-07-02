const productsService = require('../services/productsService');

class Products {
    async productExist(req, res ,next) {
        const { id } = req.params;
    
        const productExist = await productsService.productIDExist(id)
        productExist ? next() : res.json({
            success: false,
            error: {
                code: '-1',
                description: `ProductID: ${id} Not Found`
            },
        });
    }
}

module.exports = new Products();