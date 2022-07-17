const { config } = require('../../config');

// SELECTED_STORAGE: FS ; MariaDB ; Memory ; MongoDB
const BrandsDao = require(`./brands/BrandsDao${config.SELECTED_STORAGE}`);
const CartsDao = require(`./carts/CartsDao${config.SELECTED_STORAGE}`);
const CategoriesDao = require(`./categories/CategoriesDao${config.SELECTED_STORAGE}`);
const ChatDao = require(`./chat/ChatDao${config.SELECTED_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_STORAGE}`);
const UsersDao = require(`./users/UsersDao${config.SELECTED_STORAGE}`);

const myDAO = {
    brandsDao: new BrandsDao(),
    cartsDao: new CartsDao(),
    categoriesDao: new CategoriesDao(),
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