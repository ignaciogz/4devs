const brandsSchema = {
	id: { type: Number, required: true },
	name: { type: String, required: true },
	timestamp: { type: String, required: true },
};

module.exports = brandsSchema;