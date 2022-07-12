const cartService = require('../services/cartService');

const mailer = require('../../../utils/notificators/mailer');

class Cart {
    async getDetail(req, res, next) {
        const { id_cart } = req.user;
    
        const detail = await cartService.getDetail(id_cart);

        res.json({
            success: true,
            data: { detail }
        });
    };

    async getID(req, res, next) {
        const { id_cart } = req.user;
    
        const cart = await cartService.getID(id_cart);

        res.json({ 
            success: true,
            data: { cart: cart.items } 
        });
    };

    async checkout(req, res, next) {
        const { id } = req.params;
        
        const cart = await cartService.getID(id);
        const detail = cartService.getDetail(cart);
        
        mailer.send_NewOrder(req.user, detail);

        await cartService.delete(id);

        res.json({});
    }

    async add(req, res, next) {
        const { id_cart } = req.user;
        const { id_prod, qty } = req.body;
        
        const cart = await cartService.add(id_cart, id_prod, qty);
        
        res.json({ 
            success: true,
            data: { cart: cart.items } 
        });
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await cartService.delete(id);
        res.json({});
    };

    async deleteProduct(req, res, next) {
        const { id, id_prod } = req.params;
        
        await cartService.deleteProduct(id, id_prod);
        res.json({});
    };
}

module.exports = new Cart();