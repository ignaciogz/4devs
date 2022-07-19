const { usersDao } = require('../../../models/daos');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

const cartService = require('../../cart/services/cartService');
const notificationsService = require('../../notifications/services/notificationsService');

class Users {
    constructor() {
        this.storage = usersDao;
    }

    async getByEmail(email) {
        try {
            const user = await this.storage.getByEmail(email);
            return user;
        } catch (error) {
            loggerWinston.error(`UsersService -> Ejecutando: 'getByEmail()' || Error: ${error.message}`)
        }
    }

    getUserLogged(userLogged) {
        return { 
            email: userLogged.email,
            name: userLogged.name,
            img: userLogged.img,
            role: userLogged.role
        }
    }

    async add(newUser) {
        try {
            newUser.id_cart = await cartService.create();
            const userID = await this.storage.save(newUser);

            notificationsService.notify_NewRegister(newUser);

            return userID;
        } catch (error) {
            loggerWinston.error(`UsersService -> Ejecutando: 'add()' || Error: ${error.message}`)
        }
    }

    async userExist(email) {
        try {
            const user = await this.getByEmail(email);
        
            if(user) return true
            return false
        } catch (error) {
            loggerWinston.error(`UsersService -> Ejecutando: 'userExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Users();