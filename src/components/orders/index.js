const express = require('express');
const ordersController = require('./controllers/ordersController');
const authMw = require('../auth/middlewares/authMw');
const ordersMw = require('./middlewares/ordersMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/orders', router);

    router.get('/', authMw.isAdmin, ordersController.getAll);

    router.get('/:id', authMw.isAuth, ordersMw.orderExist, ordersController.getID);
    
    router.get('/all/user', authMw.isAuth, ordersController.getUserOrders)

    router.post('/', authMw.isAdmin, ordersController.add);

    router.put('/:id', authMw.isAdmin, ordersMw.orderExist, ordersController.update);
    
    router.delete('/:id', authMw.isAdmin, ordersMw.orderExist, ordersController.delete);
}