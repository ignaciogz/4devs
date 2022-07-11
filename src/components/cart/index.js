const express = require('express');
const cartController = require('./controllers/cartController');
const authMw = require('../auth/middlewares/authMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/cart', router);

    router.get('/', authMw.isAuth, cartController.getID);
    
    router.post('/', authMw.isAuth, cartController.add);

    router.post('/checkout', authMw.isAuth, cartController.checkout);
    
    router.delete('/', authMw.isAuth, cartController.delete);
    
    router.delete('/:id_prod', authMw.isAuth, cartController.deleteProduct);
}