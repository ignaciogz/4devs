const { args, DB, config } = require('./config');

const express = require("express");
const { Server: HttpServer } = require('http');

// ↓ ****** CORS ****** ↓
let cors = require("cors");

// ↓ ****** GZIP ****** ↓
const gzip = require("compression");

// ↓ ****** HTTP LOGGER ****** ↓
const morgan = require('morgan');

// ↓ ****** FLASH MESSAGES ****** ↓
const flash = require('connect-flash');

// ↓ ****** SESSIONS ****** ↓
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// ↓ ****** ROUTES ****** ↓
const serverRoutes = require('./routes');

// ↓ ****** CUSTOM MIDDLEWARES ****** ↓
const serverMw = require('./utils/middlewares/ServerMw');

class Server {
    constructor() {
        this.app = express();
        this.httpServer = new HttpServer(this.app);
        this.port = args.PORT;
        this.mode = args.MODE;
        
        this.settings();
        this.middleware();
        this.routes();
        //this.sockets();
        this.middlewareError();
    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static("./src/public"));
    }

    middleware() {
        // ↓ ****** START - CORS ****** ↓
        const whitelist = config.DEV ? [config.CLIENT_REACT_DEV] : [config.CLIENT_REACT_PROD];

        this.app.use(cors({
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1 || !origin) {
                  callback(null, true)
                } else {
                  callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true, // allow session cookie from browser to pass through
            methods: "GET,POST,PUT,DELETE",
        }));
        // ↑ ****** END - CORS ****** ↑
        
        this.app.use(morgan('dev'));

        // ↓ ****** START - GZIP ****** ↓
        this.app.use(gzip({
            threshold: 0
        }));
        // ↑ ****** END - GZIP ****** ↑

        // ↓ ****** START - SESSIONS ****** ↓
        this.app.use(cookieParser());
        this.app.use(session({
            cookie: { maxAge: config.DEV ? 3600000 : 600000 },
            resave: false,
            rolling: true,
            saveUninitialized: false,
            secret: config.SESSION_SECRET,
            store: MongoStore.create({ 
                mongoUrl: DB.mongoDB.atlas_uri,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
            })
        }));
        // ↑ ****** END - SESSIONS ****** ↑

        this.app.use(flash());
    }

    routes() {
        serverRoutes(this.app);
    }

    middlewareError() {
        this.app.use(serverMw.routeNotImplemented);
    }

    init() {
        const server = this.httpServer.listen(this.port, () => {
            console.log(`Server on http://localhost:${this.port} || Worker: ${process.pid} || Date: ${new Date()}`);
        })
        
        server.on("error", error => console.log(error));
    }
}

module.exports = new Server();