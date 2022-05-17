const authServices = require('../services/authServices');
const { administrator } = require('../../../utils/constants');

class Auth {
    async getAll(req, res, next) {
        const products = await authServices.getAll();
        res.json({ products, administrator });
    };

    async getID(req, res, next) {
        const { id } = req.params;
    
        const product = await authServices.getID(id);
        res.json({ product, administrator });
    };
    
    async add(req, res, next) {
        const newProduct = req.body;
    
        const id = await authServices.add(newProduct);
        res.json({ id });
    };
    
    async update(req, res, next) {
        const { id } = req.params;
        const modifiedProduct = req.body;
        
        await authServices.update(parseInt(id), modifiedProduct);
        res.json({});
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await authServices.delete(id);
        res.json({});
    };

    // Extras
    async productExist(req, res ,next) {
        const { id } = req.params;
    
        const productExist = await authServices.productIDExist(id)
        productExist ? next() : res.json({ error : 'producto no encontrado' });
    }
}

module.exports = new Auth();