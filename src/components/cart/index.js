const express = require('express');
const cartController = require('./controllers/cartController');
const authMw = require('../auth/middlewares/authMw');
const cartMw = require('./middlewares/cartMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/cart', router);

    router.get('/all', authMw.isAdmin, cartController.getAll);

    // For security reasons, id_cart is getted inside cart controller:
    router.get('/', authMw.isAuth, cartController.getUserCart);

    router.get('/checkout', authMw.isAuth, cartMw.verifyStocks, cartController.checkout);
    
    router.post('/:id_prod', authMw.isAuth, cartMw.verifyStock, cartController.addItem);

    router.put('/:id_prod', authMw.isAuth, cartMw.verifyStock, cartController.updateItem);
    
    router.delete('/:id_prod', authMw.isAuth, cartController.deleteItem);
}