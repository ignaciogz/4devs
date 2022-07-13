class Auth {
    access(req, res ,next) {
        const method = req.method;
    
        if(req.isAuthenticated() && req.user && !req.user.administrator && method != "GET") {
            res.json({
                success: false,
                error: {
                    code: '-2',
                    description: `path: '${req.path}' method: '${method}' NOT authorized`
                }
            });
        } else {
            next();
        }
    }
    
    isAuth(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.json({
                success: false,
                error: {
                    code: '-2',
                    description: "NOT authenticated"
                }
            });
        }
    }
    
    isNotAuth(req, res, next) {
        if(!req.isAuthenticated()) {
            next();
        } else {
            res.json({
                success: false,
                error: {
                    code: '-2',
                    description: "Authenticated"
                }
            });
        }
    }
}

module.exports = new Auth();