const categoriesService = require('../services/categoriesService');
const loggerWinston = require("../../../utils/logger");

class Categories {
    async categoryExist(req, res ,next) {
        try {
            const { id } = req.params;
        
            const categoryExist = await categoriesService.categoryIDExist(id)
            categoryExist ? next() : res.json({
                success: false,
                error: {
                    code: '-2',
                    description: `CategoryID: ${id} Not Found`
                },
            });
        } catch (error) {
            loggerWinston.error(`CategoriesMw -> 'categoryExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Categories();