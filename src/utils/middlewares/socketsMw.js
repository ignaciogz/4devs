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
                new Error("unauthorized");
            }
        }
    }
}

module.exports = new Sockets();