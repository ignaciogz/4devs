const { args, DB, config } = require('./config');

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

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

// ↓ ****** SOCKETS ****** ↓
const serverSockets = require('./utils/sockets');

// ↓ ****** CUSTOM MIDDLEWARES ****** ↓
const serverMw = require('./utils/middlewares/serverMw');

// ↓ ****** LOGGER ****** ↓
const loggerWinston = require('./utils/logger');

class Server {
    constructor() {
        this.app = express();
        this.httpServer = new HttpServer(this.app);
        this.port = args.PORT;
        this.mode = args.MODE;

        const SOCKETS_WHITELIST = config.DEV ? [config.CLIENT_REACT_DEV] : [config.CLIENT_REACT_PROD];
        this.io = new IOServer(this.httpServer, {
            cors: {
                origin: SOCKETS_WHITELIST,
                methods: ["GET", "POST"],
                credentials: true, // allow session cookie from browser to pass through
            }
        });
        
        this.settings();
        this.middleware();
        this.routes();
        this.sockets();
        this.middlewareError();
    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static("./src/public"));
    }

    middleware() {
        // ↓ ****** START - HTTP SERVER CORS ****** ↓
        const HTTP_WHITELIST = config.DEV ? [config.CLIENT_REACT_DEV] : [config.CLIENT_REACT_PROD];

        this.app.use(cors({
            origin: function (origin, callback) {
                if (HTTP_WHITELIST.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    loggerWinston.error(`Not allowed by CORS || Origin: ${origin}`);
                    callback('Not allowed by CORS');
                }
            },
            credentials: true, // allow session cookie from browser to pass through
            methods: "GET,POST,PUT,DELETE",
        }));
        // ↑ ****** END - HTTP SERVER CORS ****** ↑

        // ↓ ****** START - GZIP ****** ↓
        this.app.use(gzip({
            threshold: 0
        }));
        // ↑ ****** END - GZIP ****** ↑

        // ↓ ****** START - SESSIONS ****** ↓
        !config.DEV && this.app.set('trust proxy', 1)

        this.sessionMw = session({
            cookie: { 
                maxAge: config.DEV ? config.SESSION_TIME_DEV : config.SESSION_TIME_PROD,
                sameSite: config.DEV ? false : 'none',
                secure: true
            },
            resave: false,
            rolling: true,
            saveUninitialized: false,
            secret: config.SESSION_SECRET,
            store: MongoStore.create({ 
                mongoUrl: DB.mongoDB.atlas_uri,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
            })
        });

        this.app.use(cookieParser());
        this.app.use(this.sessionMw);
        // ↑ ****** END - SESSIONS ****** ↑

        // ↓ ****** START - HTTP LOGGER & FLASH MESSAGES ****** ↓
        config.DEV && this.app.use(morgan('dev'));
        
        this.app.use(flash());
        // ↑ ****** END - HTTP LOGGER & FLASH MESSAGES ****** ↑
    }

    routes() {
        serverRoutes(this.app);
    }

    sockets() {
        serverSockets(this.io, this.sessionMw);
    }

    middlewareError() {
        this.app.use(serverMw.routeNotImplemented);
    }

    init() {
        const server = this.httpServer.listen(this.port, () => {
            loggerWinston.info(`Server on http://localhost:${this.port} || Worker: ${process.pid} || Date: ${new Date()}`);
        })
        
        server.on("error", error => loggerWinston.error(error));
    }
}

module.exports = new Server();