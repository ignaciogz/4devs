const express = require('express');
const cartController = require('./controllers/cartController');
const router = express.Router();

module.exports = app => {
    app.use('/api/carrito', router);

    router.get('/:id/productos', cartController.getID);
    
    router.post('/', cartController.create);
    
    router.post('/:id/productos', cartController.add);

    router.post('/:id/checkout', cartController.checkout);
    
    router.delete('/:id', cartController.delete);
    
    router.delete('/:id/productos/:id_prod', cartController.deleteProduct);
}