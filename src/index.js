const { args, DB, config } = require('./config');

const express = require("express");
const { Server: HttpServer } = require('http');

// ↓ ****** CORS ****** ↓
let cors = require("cors");

// ↓ ****** GZIP ****** ↓
const gzip = require("compression");

// ↓ ****** SESIONES ****** ↓
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// ↓ ****** PASSPORT-FACEBOOK ****** ↓
const { passportLocal } = require("./utils/passport/local");
//const { passportFacebook } = require("./utils/passport/facebook");

// ↓ ****** RUTAS ****** ↓
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
        this.graphql();
        this.sockets();
        this.middlewareError();

    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static("./src/public"));
    }

    middleware() {
        this.app.use(cors('*'));

        // ↓ ****** INICIO - GZIP ****** ↓
        this.app.use(gzip({
            threshold: 0
        }));
        // ↑ ****** FIN - GZIP ****** ↑

        // ↓ ****** INICIO - SESIONES ****** ↓
        this.app.use(cookieParser());
        this.app.use(session({
            cookie: { maxAge: 600000 },
            resave: false,
            rolling: true,
            saveUninitialized: false,
            secret: config.SESSION_SECRET,
            store: MongoStore.create({ 
                mongoUrl: DB.mongoDB.atlas_uri,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
            })
        }));
        // ↑ ****** FIN - SESIONES ****** ↑

        // ↓ ****** INICIO - PASSPORT-FACEBOOK ****** ↓
        this.app.use(passportLocal.initialize());
        this.app.use(passportLocal.session());
        // ↑ ****** FIN - PASSPORT-FACEBOOK ****** ↑
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