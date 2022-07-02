const express = require('express');
const authController = require('./controllers/authController');
const authMw = require('./middlewares/authMw');
const router = express.Router();

const { passportLocal } = require('../../utils/passport/local');
const { uploadFile } = require('../../utils/multer');
const { resizer } = require('../../utils/jimp');

const resizeAvatarMw = resizer({ 
    width: 100,
    height: 100,
    fileNameProp: "username",
    folder: "avatars"
});

const uploadFileMw = new uploadFile({
    fileNameProp: "username",
});

module.exports = app => {
    app.use('/api/auth', router);

    router.get("/", authController.isLogged);
    
    router.get("/error", authMw.isNotAuth, authController.error);
    
    router.post("/login", passportLocal.authenticate("loginLocal", {successRedirect: "/", failureRedirect: "/api/auth/error"}));
    
    router.post("/register", 
        uploadFileMw.single("avatar"),
        resizeAvatarMw,
        passportLocal.authenticate("registerLocal", {failureRedirect: "/api/auth/register"}),
        (req, res, next) => { 
            res.json({success: true})
        }
    );

    router.get("/logout", authMw.isAuth, authController.logout);
}