const express = require('express');
const brandsController = require('./controllers/brandsController');
const authMw = require('../auth/middlewares/authMw');
const brandsMw = require('./middlewares/brandsMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/brands', router);

    router.get('/', brandsController.getAll);

    router.get('/:id', brandsMw.brandExist, brandsController.getID);
    
    router.post('/', authMw.isAdmin, brandsController.add);
    
    router.put('/:id', authMw.isAdmin, brandsMw.brandExist, brandsController.update);
    
    router.delete('/:id', authMw.isAdmin, brandsMw.brandExist, brandsController.delete);
}