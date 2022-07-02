const { usersDao } = require('../../../models/daos');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

class Users {
    constructor() {
        this.storage = usersDao;
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
        const user = await this.storage.getByEmail(email);
        
        if(user) return true
        return false
    }
}

module.exports = new Users();