const productsSchema = (table) => {
    table.increments("id").primary(),
    table.integer("category"),
    table.string("name"),
    table.float("price"),
    table.string("description"),
    table.string("img"),
    table.float("rating"),
    table.integer("stock"),
    table.string("timestamp")
};

module.exports = productsSchema;