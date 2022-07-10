const passportLocal = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authService = require('../services/authService');

// ↓ ****** START - PASSPORT-LOCAL ****** ↓
passportLocal.use('loginLocal', new LocalStrategy({ usernameField : 'email' , passReqToCallback: true }, authService.loginLocal));
passportLocal.use('registerLocal', new LocalStrategy({ usernameField : 'email', passReqToCallback: true }, authService.registerLocal));
passportLocal.serializeUser(authService.serializeUserLocal);
passportLocal.deserializeUser(authService.deserializeUserLocal);

module.exports = { passportLocal }