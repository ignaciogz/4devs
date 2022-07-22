const loggerWinston = require("../../../utils/logger");

class Auth {
    isLogged(req, res, next) {
        const isLogged = req.isAuthenticated()

        res.json({ 
            success: true,
            data: {
                isLogged
            }
        });
    }

    logout(req, res, next) {
        req.logout();
        req.session.destroy(err => {
            if(err) console.log(error);
            
            res.clearCookie('connect.sid');

            res.json({ 
                success: true
            });
        });
    }

    success(req, res, next) { 
        res.json({ 
            success: true
        })
    }

    error(req, res, next) {
        const errorFn = req.flash('errorFn')
        errorFn && loggerWinston.error("ERROR FLASH: ", errorFn)

        res.json({ 
            success: false 
        })
    }
}

module.exports = new Auth();