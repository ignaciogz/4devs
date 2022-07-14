const cartService = require('../services/cartService');

const mailer = require('../../../utils/notificators/mailer');

class Cart {
    async getID(req, res, next) {
        const { id_cart } = req.user;
    
        const cart = await cartService.getID(id_cart);
        const cartWithProductsDetails = await cartService.getProductsDetails(cart);

        res.json({ 
            success: true,
            data: { cart: cartWithProductsDetails } 
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
        const { id_prod } = req.params;
        const { qty } = req.body;
        
        await cartService.add(id_cart, id_prod, qty);
        
        res.json({ 
            success: true
        });
    };

    async update(req, res, next) {
        const { id_cart } = req.user;
        const { id_prod } = req.params;
        const { qty } = req.body;
        
        await cartService.update(id_cart, id_prod, qty);
        
        res.json({ 
            success: true
        });
    };
    
    async delete(req, res, next) {
        const { id_cart } = req.user;
        const { id_prod } = req.params;

        await cartService.delete(id_cart, id_prod);

        res.json({ 
            success: true,
        });
    };
}

module.exports = new Cart();