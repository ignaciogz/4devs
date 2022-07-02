const passportLocal = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authService = require('../services/authService');

// ↓ ****** INICIO - PASSPORT-LOCAL ****** ↓
passportLocal.use('loginLocal', new LocalStrategy(authService.loginLocal));
passportLocal.use('registerLocal', new LocalStrategy({ passReqToCallback: true }, authService.registerLocal));
passportLocal.serializeUser(authService.serializeUserLocal);
passportLocal.deserializeUser(authService.deserializeUserLocal);

module.exports = { passportLocal }