const { schema } = require("normalizr");

const authorsSchema = new schema.Entity('authors', undefined, { idAttribute: 'email' });

const messagesSchema = new schema.Entity('messages', {
    author: authorsSchema
});
    
const chatSchema = new schema.Entity('chatSchema', {
    chat: [messagesSchema]
})
 
module.exports = { chatSchema };