const loggerWinston = require("../logger");

class Sockets {
    getSocketIOMw(middleware) {
        return (socket, next) => middleware(socket.request, {}, next);
    }

    isAuth() {
        (socket, next) => {
            const session = socket.request.session;
            
            if (session && session.authenticated) {
                next();
            } else {
                loggerWinston.error("NOT authenticated");
            }
        }
    }
}

module.exports = new Sockets();