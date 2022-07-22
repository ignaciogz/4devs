const { AuthTools } = require("../../../utils/tools");
const loggerWinston = require("../../../utils/logger");

const usersService = require('../../users/services/usersService');

class Auth {
    async loginLocal(req, username, password, done) {
        try {
            const user = await usersService.getByEmail(username);

            if (!user) {
                return done(null, false, req.flash('authError', `Login: User '${username}' NOT Found`));
            }
        
            if (!AuthTools.isValidPassword(user, password)) {
                return done(null, false, req.flash('authError', `Login: Invalid password`));
            }
    
            return done(null, user);
        } catch (error) {
            loggerWinston.error(`AuthService -> 'loginLocal()' || Error: ${error.message}`)
        }
    }

    async registerLocal (req, username, password, done) {
        try {
            const email = username;
            const user = await usersService.getByEmail(email);

            if (user) {
                return done(null, false, req.flash('authError', `Register: User '${email}' already exist`));
            }
            
            const newUser = {
                email,
                name: req.body.name,
                password: AuthTools.createHash(password),
                img: `/img/avatars/${req.file.filename}`
            }
        
            await usersService.add(newUser);
            
            return done(null, newUser);
        } catch (error) {
            loggerWinston.error(`AuthService -> 'registerLocal()' || Error: ${error.message}`)
        }
    }

    serializeUserLocal(user, done) {
        done(null, user.email);
    }

    async deserializeUserLocal(email, done) {
        try {
            const user = await usersService.getByEmail(email);
            done(null, user);
        } catch (error) {
            loggerWinston.error(`AuthService -> 'deserializeUserLocal()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Auth();