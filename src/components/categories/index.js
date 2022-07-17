const express = require('express');
const categoriesController = require('./controllers/categoriesController');
const router = express.Router();

module.exports = app => {
    app.use('/api/categories', router);

    router.get('/', categoriesController.getAll);
}