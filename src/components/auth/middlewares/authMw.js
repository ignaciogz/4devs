const { config } = require('../../../config');

class Auth {
    isAdmin(req, res ,next) {
        if(config.POSTMAN || (req.isAuthenticated() && req.user.role === "ADMIN")) {
            next();
        } else {
            res.json({
                success: false,
                error: {
                    code: '-4',
                    description: `path: '${req.path}' method: '${method}' NOT authorized`
                }
            });
        }
    }
    
    isAuth(req, res, next) {
        if(config.POSTMAN || req.isAuthenticated()) {
            next();
        } else {
            res.json({
                success: false,
                error: {
                    code: '-3',
                    description: "NOT authenticated"
                }
            });
        }
    }
    
    isNotAuth(req, res, next) {
        if(config.POSTMAN || !req.isAuthenticated()) {
            next();
        } else {
            res.json({
                success: false,
                error: {
                    code: '-3',
                    description: "Authenticated"
                }
            });
        }
    }
}

module.exports = new Auth();