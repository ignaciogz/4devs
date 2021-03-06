const { config } = require('../config');

const authAPI = require('../components/auth');
const brandsAPI = require('../components/brands');
const cartAPI = require('../components/cart');
const categoriesAPI = require('../components/categories');
const ordersAPI = require('../components/orders');
const productsAPI = require('../components/products');
const usersAPI = require('../components/users');

module.exports = app => {
    authAPI(app);
    brandsAPI(app);
    cartAPI(app);
    categoriesAPI(app);
    ordersAPI(app);
    productsAPI(app);
    usersAPI(app);
    
    app.get('/', (req, res, next) => {
        res.json({ 
            message: "Welcome! to 4DEVS API",
            development_mode: config.DEV,
            using_postman: config.POSTMAN,
        });
    });
}