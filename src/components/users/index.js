const express = require('express');
const usersController = require('./controllers/usersController');
const authMw = require('../auth/middlewares/authMw');
const usersMw = require('./middlewares/usersMw');
const router = express.Router();

module.exports = app => {
    app.use('/api/users', router);

    router.get("/", authMw.isAuth, usersController.getUserLogged);

    router.post("/check", usersController.userExistByEmail);

    router.get('/all', authMw.isAdmin, usersController.getAll);

    router.get('/:id', authMw.isAdmin, usersMw.userExist, usersController.getID);
    
    router.post('/', authMw.isAdmin, usersController.add);
    
    router.put('/:id', authMw.isAdmin, usersMw.userExist, usersController.update);
    
    router.delete('/:id', authMw.isAdmin, usersMw.userExist, usersController.delete);
}