const { usersDao } = require('../../../models/daos');

const cartService = require('../../cart/services/cartService');
const notificationsService = require('../../notifications/services/notificationsService');

/* 
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston"); */

class Users {
    constructor() {
        this.storage = usersDao;
    }

    async getByEmail(email) {
        //FALTA TRY CATCH
        const user = await this.storage.getByEmail(email);
        return user;
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
        //FALTA TRY CATCH
        notificationsService.notify_NewRegister(newUser);
        newUser.id_cart = await cartService.create();
    
        const userID = await this.storage.save(newUser);
        return userID;
    }

    async userExist(email) {
        //FALTA TRY CATCH
        const user = await this.getByEmail(email);
        
        if(user) return true
        return false
    }
}

module.exports = new Users();