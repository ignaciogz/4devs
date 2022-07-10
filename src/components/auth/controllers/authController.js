const authService = require('../services/authService');

class Auth {
    isLogged(req, res, next) {
        if(req.isAuthenticated()) {
            res.json({ 
                success: true,
                data: {
                    isLogged: true 
                }
            });
        } else {
            res.json({ 
                success: true,
                data: {
                    isLogged: false
                }
            });
        }
    }

    logout(req, res, next) {
        req.session.destroy(err => {
            if(err) console.log(error);
            
            res.json({ 
                success: true,
                data: {
                    isLogged: false
                }
            });
        });
    }

    success(req, res, next) { 
        res.json({ success: true })
    }

    error(req, res, next) {
        const errorFn = req.flash('errorFn')
        console.log("ERROR FLASH: ", errorFn)
        res.json({ success: false })
    }
}

module.exports = new Auth();