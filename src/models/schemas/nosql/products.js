const productsSchema = {
	id: { type: Number, required: true },
	category: { type: Number, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
    description: { type: String, required: true },
	img: { type: String, required: true },
	rating: { type: Number, required: true },
	stock: { type: Number, required: true },
	timestamp: { type: String, required: true }
};

module.exports = productsSchema;