const express = require('express');
const usersController = require('./controllers/usersController');
const authMw = require('../auth/middlewares/authMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/users', router);

    router.get("/", authMw.isAuth, usersController.getUserLogged);
    router.post("/check", usersController.userExist);
}