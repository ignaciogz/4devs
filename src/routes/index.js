const authAPI = require('../components/auth');
const cartAPI = require('../components/cart');
const productsAPI = require('../components/products');
const usersAPI = require('../components/users');

module.exports = app => {
    authAPI(app);
    cartAPI(app);
    productsAPI(app);
    usersAPI(app);
    
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: __dirname });
    });
}