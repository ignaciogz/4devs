const { usersDao } = require('../../../models/daos');
const loggerWinston = require("../../../utils/logger");

const cartService = require('../../cart/services/cartService');
const notificationsService = require('../../notifications/services/notificationsService');

class Users {
    constructor() {
        this.storage = usersDao;
    }

    async getAll() {
        try {
            const users = await this.storage.getAll();
            return users;
        } catch (error) {
            loggerWinston.error(`UsersService -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async getID(id) {
        try {
            const user = await this.storage.getByID(id);
            return user;
        } catch (error) {
            loggerWinston.error(`UsersService -> 'getID()' || Error: ${error.message}`)
        }
    }

    async add(newUser) {
        try {
            newUser.id_cart = await cartService.create();
            const userID = await this.storage.save(newUser);

            notificationsService.notify_NewRegister(newUser);

            return userID;
        } catch (error) {
            loggerWinston.error(`UsersService -> 'add()' || Error: ${error.message}`)
        }
    }

    async update(id, modifiedUser) {
        try {
            await this.storage.update(id, modifiedUser);    
        } catch (error) {
            loggerWinston.error(`UsersService -> 'update()' || Error: ${error.message}`)
        }
    }

    async delete(id) {
        try {
            await this.storage.deleteById(id);    
        } catch (error) {
            loggerWinston.error(`UsersService -> 'delete()' || Error: ${error.message}`)
        }
    }

    async userIDExist(id) {
        try {
            const exist = await this.storage.elementExist(id);
            return exist;   
        } catch (error) {
            loggerWinston.error(`UsersService -> 'userIDExist()' || Error: ${error.message}`)
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

    async getByEmail(email) {
        try {
            const user = await this.storage.getByEmail(email);
            return user;
        } catch (error) {
            loggerWinston.error(`UsersService -> 'getByEmail()' || Error: ${error.message}`)
        }
    }

    async userExistByEmail(email) {
        try {
            const user = await this.getByEmail(email);
        
            if(user) return true
            return false
        } catch (error) {
            loggerWinston.error(`UsersService -> 'userExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Users();