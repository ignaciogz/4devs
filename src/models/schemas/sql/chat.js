const chatSchema = (table) => {
    table.increments("id").primary(),
    table.json('author'),
    table.string("message"),
    table.string("timestamp")
};
 
module.exports = chatSchema;