const usersService = require('../services/usersService');

class Users {
    getUserData(req, res, next) {
        try {
            const user = usersService.getUserData(req.user);

            res.json({ 
                success: true,
                data: { user } 
            });
        } catch (error) {
            console.log(error);
        }
    }

    async userExist(req, res ,next) {
        try {
            const { email } = req.body;
            const userExist = await usersService.userExist(email)
            
            res.json({ 
                success: true,
                data: { 
                    user: { exist: userExist }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Users();