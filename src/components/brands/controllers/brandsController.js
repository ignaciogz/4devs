const brandsService = require('../services/brandsService');

class Brands {
    async getAll(req, res, next) {
        const brands = await brandsService.getAll();

        res.json({ 
            success: true,
            data: { brands } 
        });
    };
}

module.exports = new Brands();