const loggerWinston = require("../logger");

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
            loggerWinston.error(`Sockets -> 'messagesHandler()' || Error: ${error.message}`)
        }
    }
}

module.exports = messagesHandler;