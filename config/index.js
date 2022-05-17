const yargs = require('yargs/yargs')(process.argv.slice(2))
const { ObjectTools } = require('../utils/tools');
require('dotenv').config();

let args = yargs
                .default({
                    "MODE": "FORK",
                    "PORT": process.env.PORT || 8000,
                })
                .alias({
                    m: "MODE",
                    p: "PORT"
                })       
            .argv;
args = ObjectTools.removeAllPropertiesExcept(args, ["MODE", "PORT"]);

const config = {
    PORT: process.env.PORT,
    SELECTED_STORAGE: process.env.STORAGE,
}

const DB = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "4devs",
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    },
    mongoDB: {
        uri: `mongodb://${process.env.MONGO_DB_HOST || "localhost"}:${process.env.MONGO_DB_PORT || "27017"}/${process.env.MONGO_DB_NAME || "4devs"}`,
        atlas_uri: `${process.env.MONGO_ATLAS}` || ""
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./data/db/${process.env.DB_NAME || "4devs"}.sqlite`
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    }
}

module.exports = { config, DB };