const usersSchema = {
	email: { type: String, required: true },
	id: { type: Number, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
	img: { type: String, required: true },
	role: { type: String, required: true },
	id_cart: { type: Number, required: true },
	timestamp: { type: String, required: true }
};

module.exports = usersSchema;