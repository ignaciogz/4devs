const express = require('express');
const authController = require('./controllers/authController');
/* const ProductsMw = require('../../utils/middlewares/ProductsMw'); */

module.exports = app => {
    const router = express.Router();
    app.use('/api/auth', router);

    // Aqui cargo los middlewares de rutas
    /* router.all('/', ProductsMw.access);
    router.all('/:id', ProductsMw.access); */

    router.get('/', authController.getAll);
     
    router.get('/:id', authController.productExist, authController.getID);
    
    router.post('/', authController.add);
    
    router.put('/:id', authController.productExist, authController.update);
    
    router.delete('/:id', authController.productExist, authController.delete);
}