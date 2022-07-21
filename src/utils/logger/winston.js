const { config } = require('../../config');
let winston = require("winston");

const myLoggers = { 
    infoLog: winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console()
        ]
    }),
    warnLog: winston.createLogger({
        level: "warn",
        transports: [
            new winston.transports.File({
                filename: './src/data/logs/warn.log',
            }),
        ]
    }),
    errorLog: winston.createLogger({
        level: "error",
        transports: [
            new winston.transports.File({
                filename: './src/data/logs/error.log',
            }),
        ]
    })
}

class Winston {
    static infoLog = myLoggers.infoLog;
    static warnLog = myLoggers.warnLog;
    static errorLog = myLoggers.errorLog;

    constructor() {
        if (config.DEV) {
            Winston.warnLog.add(new winston.transports.Console());
            Winston.errorLog.add(new winston.transports.Console());
        }
    }

    info(message) {
        Winston.infoLog.log("info", message);
    }

    warn(message) {
        Winston.warnLog.log("warn", message);
    }

    error(message) {
        Winston.errorLog.log("error", message);
    }
}

module.exports = Winston;