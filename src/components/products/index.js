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

module.exports = app => {
    app.use('/api/products', router);

    router.get('/', productsController.getAll);
     
    router.get('/:id', productsMw.productExist, productsController.getID);
    
    router.post('/', authMw.isAdmin,
        uploadFileMw.single("img"),
        resizeProductImgMw,
        productsController.add
    );
    
    router.put('/:id', authMw.isAdmin,
        productsMw.productExist,
        uploadFileMw.single("img"),
        resizeProductImgMw,
        productsController.update
    );
    
    router.delete('/:id', authMw.isAdmin,
        productsMw.productExist,
        productsController.delete
    );
}