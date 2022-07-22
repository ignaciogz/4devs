const { DB } = require('./');
const mongoose = require("mongoose");
const loggerWinston = require('../utils/logger');

const MONGO_URI = DB.mongoDB.atlas_uri ? DB.mongoDB.atlas_uri : DB.mongoDB.local_uri;

(async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(()=>{ 
        loggerWinston.info("--------------------------------------------------------------------");
        loggerWinston.info("MongoDB CONNECTED !");
    })
    .catch(error => loggerWinston.error(error));
})();

module.exports = { mongoose };