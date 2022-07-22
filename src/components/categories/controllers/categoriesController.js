const categoriesService = require('../services/categoriesService');
const loggerWinston = require("../../../utils/logger");

class Categories {
    async getAll(req, res, next) {
        try {
            const categories = await categoriesService.getAll();

            res.json({ 
                success: true,
                data: { categories } 
            });
        } catch (error) {
            loggerWinston.error(`CategoriesController -> 'getAll()' || Error: ${error.message}`)
        }
    };

    async getID(req, res, next) {
        try {
            const { id } = req.params;

            const category = await categoriesService.getID(id);
    
            res.json({ 
                success: true,
                data: { category } 
            });   
        } catch (error) {
            loggerWinston.error(`CategoriesController -> 'getID()' || Error: ${error.message}`)
        }
    };
    
    async add(req, res, next) {
        try {
            const newCategory = req.body;
    
            const id = await categoriesService.add(newCategory);
    
            res.json({ 
                success: true,
                data: { id }
            });   
        } catch (error) {
            loggerWinston.error(`CategoriesController -> 'add()' || Error: ${error.message}`)
        }
    };
    
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const modifiedCategory = req.body;
            
            await categoriesService.update(parseInt(id), modifiedCategory);
    
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`CategoriesController -> 'update()' || Error: ${error.message}`)
        }
    };
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
        
            await categoriesService.delete(id);
            
            res.json({ 
                success: true
            });
        } catch (error) {
            loggerWinston.error(`CategoriesController -> 'delete()' || Error: ${error.message}`)
        }
    };
}

module.exports = new Categories();