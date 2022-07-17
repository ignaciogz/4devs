const express = require('express');
const brandsController = require('./controllers/brandsController');
const router = express.Router();

module.exports = app => {
    app.use('/api/brands', router);

    router.get('/', brandsController.getAll);
}