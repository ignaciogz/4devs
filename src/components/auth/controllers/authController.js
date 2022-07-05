const authService = require('../services/authService');

class Auth {
    isLogged(req, res, next) {
        if(req.isAuthenticated()) {
            res.json({ isLogged: true });
        } else {
            res.json({ isLogged: false });
        }
    }

    error(req, res, next) {
        res.json({ success: false })
    }

    success(req, res, next) { 
        res.json({ success: true })
    }

    logout(req, res, next) {
        req.session.destroy( err => {
            if(err) res.send(JSON.stringify(err));
            res.redirect("/");
        });
    }
}

module.exports = new Auth();