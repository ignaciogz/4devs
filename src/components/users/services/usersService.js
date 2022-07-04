const { usersDao } = require('../../../models/daos');

const { config } = require('../../../config');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Users {
    constructor() {
        this.storage = usersDao;
    }

    async getByEmail(email) {
        //FALTA TRY CATCH
        const user = await this.storage.getByEmail(email);
        return user;
    }

    async add(newUser) {
        //FALTA TRY CATCH
        const userID = await this.storage.save(newUser);
        return userID;
    }

    getUserData(userLogged) {
        return { 
            email: userLogged.email,
            nombre: userLogged.nombre,
            img: userLogged.img,
            role: userLogged.role
        }
    }

    async userExist(email) {
        //FALTA TRY CATCH
        const user = await this.getByEmail(email);
        
        if(user) return true
        return false
    }
}

module.exports = new Users();