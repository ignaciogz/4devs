const { DB } = require('./');
const mongoose = require("mongoose");
const winstonLogger = require('../utils/logger');

const MONGO_URI = DB.mongoDB.atlas_uri ? DB.mongoDB.atlas_uri : DB.mongoDB.local_uri;

(async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(()=>{ 
        winstonLogger.info("--------------------------------------------------------------------");
        winstonLogger.info("MongoDB CONNECTED !");
    })
    .catch(error => winstonLogger.error(error));
})();

module.exports = { mongoose };