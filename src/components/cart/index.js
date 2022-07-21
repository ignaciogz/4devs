const express = require('express');
const cartController = require('./controllers/cartController');
const authMw = require('../auth/middlewares/authMw');
const cartMw = require('./middlewares/cartMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/cart', router);

    router.get('/', authMw.isAuth, cartController.getID);

    router.get('/checkout', authMw.isAuth, cartMw.verifyStocks, cartController.checkout);
    
    router.post('/:id_prod', authMw.isAuth, cartMw.verifyStock, cartController.add);

    router.put('/:id_prod', authMw.isAuth, cartMw.verifyStock, cartController.update);
    
    router.delete('/:id_prod', authMw.isAuth, cartController.delete);
}