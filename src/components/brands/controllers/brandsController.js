const brandsService = require('../services/brandsService');
const loggerWinston = require("../../../utils/logger");

class Brands {
    async getAll(req, res, next) {
        try {
            const brands = await brandsService.getAll();

            res.json({ 
                success: true,
                data: { brands } 
            });
        } catch (error) {
            loggerWinston.error(`BrandsController -> 'getAll()' || Error: ${error.message}`)
        }
    };

    async getID(req, res, next) {
        try {
            const { id } = req.params;

            const brand = await brandsService.getID(id);
    
            res.json({ 
                success: true,
                data: { brand } 
            });   
        } catch (error) {
            loggerWinston.error(`BrandsController -> 'getID()' || Error: ${error.message}`)
        }
    };
    
    async add(req, res, next) {
        try {
            const newBrand = req.body;
    
            const id = await brandsService.add(newBrand);
    
            res.json({ 
                success: true,
                data: { id }
            });   
        } catch (error) {
            loggerWinston.error(`BrandsController -> 'add()' || Error: ${error.message}`)
        }
    };
    
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const modifiedBrand = req.body;
            
            await brandsService.update(parseInt(id), modifiedBrand);
    
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`BrandsController -> 'update()' || Error: ${error.message}`)
        }
    };
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
        
            await brandsService.delete(id);
            
            res.json({ 
                success: true
            });   
        } catch (error) {
            loggerWinston.error(`BrandsController -> 'delete()' || Error: ${error.message}`)
        }
    };
}

module.exports = new Brands();