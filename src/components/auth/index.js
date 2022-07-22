const express = require('express');
const authController = require('./controllers/authController');
const authMw = require('./middlewares/authMw');
const router = express.Router();

const { passportLocal } = require('./middlewares/passportLocalMw');
const { uploadFile } = require('../../utils/multer');
const { resizer } = require('../../utils/jimp/resizer');

const resizeAvatarMw = resizer({ 
    width: 100,
    height: 100,
    fileNameProp: "email",
    folder: "avatars"
});

const uploadFileMw = new uploadFile({
    fileNameProp: "email",
});

module.exports = app => {
    app.use(passportLocal.initialize());
    app.use(passportLocal.session());
    
    app.use('/api/auth', router);

    router.get("/", authController.isLogged);
    
    router.get("/error", authMw.isNotAuth, authController.error);
    
    router.get("/logout", authMw.isAuth, authController.logout);

    router.get("/success", authMw.isAuth, authController.success);

    router.post("/login", 
        authMw.isNotAuth,
        passportLocal.authenticate("loginLocal", { successRedirect: "/api/auth/success", failureRedirect: "/api/auth/error", failureFlash: true })
    );
    
    router.post("/register",
        authMw.isNotAuth,
        uploadFileMw.single("avatar"),
        resizeAvatarMw,
        passportLocal.authenticate("registerLocal", { successRedirect: "/api/auth/success", failureRedirect: "/api/auth/error", failureFlash: true })
    );
}