const { DB } = require('./');
const mongoose = require("mongoose");

const MONGO_URI = DB.mongoDB.atlas_uri ? DB.mongoDB.atlas_uri : DB.mongoDB.local_uri;

(async () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(()=>{ 
        console.log("--------------------------------------------------------------------");
        console.log("MongoDB is connected !");
    })
    .catch(error => console.log(error));
})();

module.exports = { mongoose };