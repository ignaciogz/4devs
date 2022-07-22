const loggerWinston = require("../logger");

class ServerMw {
    routeNotImplemented(req, res, next) {
        loggerWinston.warn(`path: '${req.path}' method: '${req.method}' NOT implemented`);

        res.status(404).json({
            error: '-1', 
            descripcion: `path: '${req.path}' method: '${req.method}' NOT implemented`
        })
    }
}

module.exports = new ServerMw();