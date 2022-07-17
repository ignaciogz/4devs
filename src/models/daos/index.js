const { config } = require('../../config');

// SELECTED_STORAGE: FS ; MariaDB ; Memory ; MongoDB
const CartsDao = require(`./carts/CartsDao${config.SELECTED_STORAGE}`);
const ChatDao = require(`./chat/ChatDao${config.SELECTED_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_STORAGE}`);
const UsersDao = require(`./users/UsersDao${config.SELECTED_STORAGE}`);

const myDAO = {
    cartsDao: new CartsDao(),
    chatDao: new ChatDao(),
    productsDao: new ProductsDao(),
    usersDao:  new UsersDao()
}

class DAO {
    static singleton;

    constructor() {
        if(DAO.singleton){
            return DAO.singleton;
        }
        
        DAO.singleton = myDAO;
        this.singleton = DAO.singleton;
    }
}

module.exports = new DAO().singleton;