const brandsService = require('../services/brandsService');

class Brands {
    async brandExist(req, res ,next) {
        try {
            const { id } = req.params;
        
            const brandExist = await brandsService.brandIDExist(id)
            brandExist ? next() : res.json({
                success: false,
                error: {
                    code: '-2',
                    description: `BrandID: ${id} Not Found`
                },
            });
        } catch (error) {
            loggerWinston.error(`BrandsMw -> 'brandExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Brands();