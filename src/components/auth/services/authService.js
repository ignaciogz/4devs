const { AuthTools } = require("../../../utils/tools");
const { errorLog: loggerWinston } = require("../../../utils/loggers/winston");

const usersService = require('../../users/services/usersService');

class Auth {
    async loginLocal(req, username, password, done) {
        try {
            const user = await usersService.getByEmail(username);

            if (!user) {
                loggerWinston.error(`Error en login -> Passport: 'LOCAL' || Msj: Usuario con email '${username}' NO encontrado`);
                
                return done(null, false, req.flash('errorFn', 'login'));
            }
        
            if (!AuthTools.isValidPassword(user, password)) {
                loggerWinston.error(`Contraseña invalida`);
                
                return done(null, false, req.flash('errorFn', 'login'));
            }
    
            return done(null, user);
        } catch (error) {
            loggerWinston.error(`Passport Local -> Ejecutando: 'Login LocalStrategy' || Error: ${error.message}`)
        }
    }

    async registerLocal (req, username, password, done) {
        try {
            const email = username;
            const user = await usersService.getByEmail(email);

            if (user) {
                loggerWinston.error(`Error en register -> Passport: 'LOCAL' || Msj: El usuario '${email}' ya existe !`);
                return done(null, false, req.flash('errorFn', 'register'));
            }
            
            const newUser = {
                email,
                name: req.body.name,
                password: AuthTools.createHash(password),
                img: req.file.filename,
                role: "user"
            }
        
            await usersService.add(newUser);
            
            return done(null, newUser);
        } catch (error) {
            loggerWinston.error(`Passport Local -> Ejecutando: 'Register LocalStrategy' || Error: ${error.message}`)
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
            loggerWinston.error(`Passport Local -> Ejecutando: 'deserializeUser' || Error: ${error.message}`)
        }
    }
}

module.exports = new Auth();