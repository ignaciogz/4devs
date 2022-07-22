const usersSchema = (table) => {
    table.string("email"),
    table.increments("id").primary(),
    table.string("name"),
    table.string("password"),
    table.string("img"),
    table.string("role"),
    table.integer("id_cart"),
    table.string("timestamp")
};

module.exports = usersSchema;