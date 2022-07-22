const { chatSchema } = require("../../models/schemas/normalize/chat");
const { NormalizeTools } = require("../tools");
const loggerWinston = require("../logger");

const socketsMw = require('../middlewares/socketsMw');
const chatService = require('../../components/chat/services/chatService');

// ↓ ****** START - LIST OF HANDLERS ****** ↓
const messagesHandler = require('./messagesHandler')
// ↑ ****** END - LIST OF HANDLERS ****** ↑

const chatSocket = io => {
    return async socket => {
        try {
            console.log('User connected: ', socket.id);
            
            const messages = await chatService.getAll();
            const chat = NormalizeTools.getNormalizeData(messages, chatSchema, "chat");
            
            socket.emit('init', { chat });

            // ↓ ****** START - ASSOCIATING HANDLERS ****** ↓
            socket.on("new-message", messagesHandler(io, socket));
        } catch (error) {
            loggerWinston.error(`Sockets -> 'chatSocket()' || Error: ${error.message}`)
        }
    }
}

module.exports = (io, sessionMw) => {
    io.use(socketsMw.getSocketIOMw(sessionMw)); // Transform a connect middleware to a Socket.IO middleware
    io.use(socketsMw.isAuth()); // Only allow authenticated users

    io.on('connection', chatSocket(io));
}