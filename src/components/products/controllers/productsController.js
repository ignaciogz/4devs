const productsService = require('../services/productsService');
const loggerWinston = require("../../../utils/logger");

class Products {
    async getAll(req, res, next) {
        try {
            const products = await productsService.getAll();

            res.json({ 
                success: true,
                data: { products } 
            });    
        } catch (error) {
            loggerWinston.error(`ProductsController -> 'getAll()' || Error: ${error.message}`)
        }
    };

    async getID(req, res, next) {
        try {
            const { id } = req.params;

            const product = await productsService.getID(id);
    
            res.json({ 
                success: true,
                data: { product } 
            });   
        } catch (error) {
            loggerWinston.error(`ProductsController -> 'getID()' || Error: ${error.message}`)
        }
    };
    
    async add(req, res, next) {
        try {
            const newProduct = req.body;
    
            const id = await productsService.add(newProduct);
    
            res.json({ 
                success: true,
                data: { id }
            });   
        } catch (error) {
            loggerWinston.error(`ProductsController -> 'add()' || Error: ${error.message}`)
        }
    };
    
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const modifiedProduct = req.body;
            
            await productsService.update(parseInt(id), modifiedProduct);
    
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`ProductsController -> 'update()' || Error: ${error.message}`)
        }
    };
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
        
            await productsService.delete(id);
            
            res.json({ 
                success: true
            });   
        } catch (error) {
            loggerWinston.error(`ProductsController -> 'delete()' || Error: ${error.message}`)
        }
    };
}

module.exports = new Products();