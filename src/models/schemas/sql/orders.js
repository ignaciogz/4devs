const ordersSchema = (table) => {
    table.increments("id").primary(),
    table.json('client')
    table.string("timestamp"),
    table.json('items')
}

module.exports = ordersSchema;