const { usersDao } = require('../../../models/daos');

const { config } = require('../../../config');
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");
const { NodeMailer } = require('../../../utils/notificators/mailer');

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

    notify_NewRegister(newUser) {
        const html = `
                <h1 style="color: coral;">New User</h1>
                
                <table style="width:100%">
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Email:</th>
                        <td>${newUser.email}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Password:</th>
                        <td>${newUser.password}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Name:</th>
                        <td>${newUser.name}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Avatar:</th>
                        <td>${newUser.img}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Role:</th>
                        <td>${newUser.role}</td>
                    </tr>
                </table>
        `;

        const mailOptionsAdmin = {
            from: 'Node.js Server',
            to: config.ADMIN_EMAIL,
            subject: '4DEVS Shop - New User',
            html
        }

        const mailOptionsNewUser = {
            from: 'Node.js Server',
            to: newUser.email,
            subject: '4DEVS Shop - New User',
            html
        }
        
        NodeMailer.send(mailOptionsAdmin, "notify_NewRegister() - Admin");
        NodeMailer.send(mailOptionsNewUser, "notify_NewRegister() - NewUser");
    }
}

module.exports = new Users();