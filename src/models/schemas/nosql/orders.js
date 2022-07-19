const ordersSchema = {
    id: { type: Number, required: true },
    client: {
        email: { type: String, required: true },
	    name: { type: String, required: true } 
    },
    timestamp: { type: String, required: true },
    items: [
        {
            id: { type: Number, required: true },
            category: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            img: { type: String, required: true },
            stock: { type: Number, required: true },
            brand: { type: String, required: true },
            qty: { type: Number, required: true },
            timestamp: { type: String, required: true }
        }
    ],
};

module.exports = ordersSchema;