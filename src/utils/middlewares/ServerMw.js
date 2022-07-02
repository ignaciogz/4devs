class ServerMw {
    routeNotImplemented(req, res, next) {
        res.status(404).json({
            error: '-2', 
            descripcion: `path: '${req.path}' method: '${req.method}' NOT implemented`
        })
    }
}

module.exports = new ServerMw();