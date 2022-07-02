const productsService = require('../services/productsService');

class Products {
    async getAll(req, res, next) {
        const products = await productsService.getAll();
        res.json({ 
            success: true,
            data: { products } 
        });
    };

    async getID(req, res, next) {
        const { id } = req.params;
    
        const product = await productsService.getID(id);
        res.json({ 
            success: true,
            data: { product } 
        });
    };
    
    async add(req, res, next) {
        const newProduct = req.body;
    
        const id = await productsService.add(newProduct);
        res.json({ 
            success: true,
            data: { id } 
        });
    };
    
    async update(req, res, next) {
        const { id } = req.params;
        const modifiedProduct = req.body;
        
        await productsService.update(parseInt(id), modifiedProduct);
        res.json({ 
            success: true
        });
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await productsService.delete(id);
        res.json({ 
            success: true
        });
    };
}

module.exports = new Products();