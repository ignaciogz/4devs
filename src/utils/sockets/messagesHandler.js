const { errorLog: loggerWinston } = require("../loggers/winston");

const chatService = require('../../components/chat/services/chatService');

const messagesHandler = (io, socket) => {
    return async newMessage => {
        try {
            let userIdentifier = socket.request.session.passport.user

            newMessage.author = {
                email: userIdentifier,
            }

            await chatService.add(newMessage);

            io.sockets.emit('new-message', newMessage);
        } catch (error) {
            loggerWinston.error(`Messages Socket -> Error: ${error.message}`)
        }
    }
}

module.exports = messagesHandler;