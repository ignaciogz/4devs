const usersService = require('../services/usersService');
const loggerWinston = require("../../../utils/logger");

class Users {
    async userExist(req, res ,next) {
        try {
            const { id } = req.params;
        
            const userExist = await usersService.userIDExist(id)
            userExist ? next() : res.json({
                success: false,
                error: {
                    code: '-2',
                    description: `UserID: ${id} Not Found`
                },
            });
        } catch (error) {
            loggerWinston.error(`UsersMw -> 'userExist()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Users();