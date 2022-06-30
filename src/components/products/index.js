const express = require('express');
const productsController = require('./controllers/productsController');
const ProductsMw = require('./middlewares/productsMiddleware');
const router = express.Router();

module.exports = app => {
    app.use('/api/productos', router);

    router.all('/', ProductsMw.access);

    router.all('/:id', ProductsMw.access);

    router.get('/', productsController.getAll);
     
    router.get('/:id', productsController.productExist ,productsController.getID);
    
    router.post('/', productsController.add);
    
    router.put('/:id', productsController.productExist ,productsController.update);
    
    router.delete('/:id', productsController.productExist ,productsController.delete);
}