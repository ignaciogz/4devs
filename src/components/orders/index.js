const express = require('express');
const ordersController = require('./controllers/ordersController');
const authMw = require('../auth/middlewares/authMw');
const ordersMw = require('./middlewares/ordersMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/orders', router);
     
    router.get('/:id', authMw.isAuth, ordersMw.orderExist, ordersController.getID);
    
    router.get('/all/user', authMw.isAuth, ordersController.getUserOrders)
}