const { chatDao } = require('../../../models/daos');
const loggerWinston = require("../../../utils/logger");

const usersService = require('../../users/services/usersService');

class Chat {
    constructor() {
        this.storage = chatDao;
    }

    async getAll() {
        try {
            let chat = [];
            const messages = await this.storage.getAll();
            
            for (let message of messages) {
                let userLogged = await usersService.getByEmail(message.author.email);
                
                let { name, img } = userLogged;
                message.author = {
                    ...message.author,
                    name,
                    img,
                }

                chat.push(message);
            }

            return chat;
        } catch (error) {
            loggerWinston.error(`ChatService -> 'getAll()' || Error: ${error.message}`)
        }
    }

    async add(newMessage) {
        try {
            const userLogged = await usersService.getByEmail(newMessage.author.email);
                
            let { name, img } = userLogged;
            newMessage.author = {
                ...newMessage.author,
                name,
                img,
            }

            const messageID = await this.storage.save(newMessage);
            return messageID;
        } catch (error) {
            loggerWinston.error(`ChatService -> 'add()' || Error: ${error.message}`)
        }
    }
}

module.exports = new Chat();