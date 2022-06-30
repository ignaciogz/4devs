const express = require('express');
const usersController = require('./controllers/usersController');
const authMw = require('../auth/middlewares/authMiddleware');
const router = express.Router();

module.exports = app => {
    app.use('/api/usuario', router);

    router.get("/", authMw.isAuth, usersController.getUserData);
}