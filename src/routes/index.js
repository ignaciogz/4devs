const authAPI = require('../components/auth');
const brandsAPI = require('../components/brands');
const cartAPI = require('../components/cart');
const categoriesAPI = require('../components/categories');
const productsAPI = require('../components/products');
const usersAPI = require('../components/users');

module.exports = app => {
    authAPI(app);
    brandsAPI(app);
    cartAPI(app);
    categoriesAPI(app);
    productsAPI(app);
    usersAPI(app);
    
    app.get('/', (req, res, next) => {
        res.sendFile('index.html', { root: __dirname });
    });
}