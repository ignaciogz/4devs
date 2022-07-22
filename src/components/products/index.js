const { config } = require('../../config');
const express = require('express');
const productsController = require('./controllers/productsController');
const authMw = require('../auth/middlewares/authMw');
const productsMw = require('./middlewares/productsMw');
const router = express.Router();

const { uploadFile } = require('../../utils/multer');
const { resizer } = require('../../utils/jimp/resizer');

const resizeProductImgMw = resizer({ 
    width: 342,
    height: 342,
    fileNameProp: "name",
    folder: "products"
});

const uploadFileMw = new uploadFile({
    fileNameProp: "name",
});

const productImgMws = config.POSTMAN 
    ? [(req, res, next) => next()] 
    : [uploadFileMw.single("img"), resizeProductImgMw];

module.exports = app => {
    app.use('/api/products', router);

    router.get('/', productsController.getAll);
     
    router.get('/:id', productsMw.productExist, productsController.getID);
    
    router.post('/', authMw.isAdmin,
        productImgMws,
        productsController.add
    );
    
    router.put('/:id', authMw.isAdmin,
        productsMw.productExist,
        productImgMws,
        productsController.update
    );
    
    router.delete('/:id', authMw.isAdmin,
        productsMw.productExist,
        productsController.delete
    );
}