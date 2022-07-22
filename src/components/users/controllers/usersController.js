const usersService = require('../services/usersService');
const loggerWinston = require("../../../utils/logger");

class Users {
    async getAll(req, res, next) {
        try {
            const users = await usersService.getAll();

            res.json({ 
                success: true,
                data: { users } 
            });
        } catch (error) {
            loggerWinston.error(`UsersController -> 'getAll()' || Error: ${error.message}`)
        }
    };

    async getID(req, res, next) {
        try {
            const { id } = req.params;

            const user = await usersService.getID(id);
    
            res.json({ 
                success: true,
                data: { user } 
            });   
        } catch (error) {
            loggerWinston.error(`UsersController -> 'getID()' || Error: ${error.message}`)
        }
    };

    async add(req, res, next) {
        try {
            const newUser = req.body;
    
            const id = await usersService.add(newUser);
    
            res.json({ 
                success: true,
                data: { id }
            });   
        } catch (error) {
            loggerWinston.error(`UsersController -> 'add()' || Error: ${error.message}`)
        }
    };
    
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const modifiedUser = req.body;
            
            await usersService.update(parseInt(id), modifiedUser);
    
            res.json({ 
                success: true
            });    
        } catch (error) {
            loggerWinston.error(`UsersController -> 'update()' || Error: ${error.message}`)
        }
    };
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
        
            await usersService.delete(id);
            
            res.json({ 
                success: true
            });   
        } catch (error) {
            loggerWinston.error(`UsersController -> 'delete()' || Error: ${error.message}`)
        }
    };

    getUserLogged(req, res, next) {
        const user = usersService.getUserLogged(req.user);

        res.json({ 
            success: true,
            data: { user } 
        });
    }

    async userExistByEmail(req, res ,next) {
        try {
            const { email } = req.body;
            const userExist = await usersService.userExistByEmail(email)
            
            res.json({ 
                success: true,
                data: { 
                    user: { exist: userExist }
                }
            });
        } catch (error) {
            loggerWinston.error(`UsersController -> 'userExistByEmail()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Users();