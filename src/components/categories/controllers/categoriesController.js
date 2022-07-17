const categoriesService = require('../services/categoriesService');

class Categories {
    async getAll(req, res, next) {
        const categories = await categoriesService.getAll();

        res.json({ 
            success: true,
            data: { categories } 
        });
    };
}

module.exports = new Categories();