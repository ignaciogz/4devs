const cartsSchema = {
    id: { type: Number, required: true },
    timestamp: { type: String, required: true },
    items: [
        {
            id: { type: Number, required: true },
            qty: { type: Number, required: true },
        }
    ],
};

module.exports = cartsSchema;