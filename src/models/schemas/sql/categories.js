const categoriesSchema = (table) => {
    table.increments("id").primary(),
    table.string("name"),
    table.string("timestamp")
};

module.exports = categoriesSchema;