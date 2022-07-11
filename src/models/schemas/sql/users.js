const usersSchema = (table) => {
    table.increments("id").primary(),
    table.string("email"),
    table.string("name"),
    table.string("password"),
    table.string("img"),
    table.string("role"),
    table.integer("id_cart"),
    table.string("timestamp")
};

module.exports = usersSchema;