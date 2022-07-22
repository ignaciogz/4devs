const express = require('express');
const categoriesController = require('./controllers/categoriesController');
const authMw = require('../auth/middlewares/authMw');
const categoriesMw = require('./middlewares/categoriesMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/categories', router);

    router.get('/', categoriesController.getAll);

    router.get('/:id', categoriesMw.categoryExist, categoriesController.getID);
    
    router.post('/', authMw.isAdmin, categoriesController.add);
    
    router.put('/:id', authMw.isAdmin, categoriesMw.categoryExist, categoriesController.update);
    
    router.delete('/:id', authMw.isAdmin, categoriesMw.categoryExist, categoriesController.delete);
}