const chatSchema = {
	id: { type: Number, required: true },
	author: {
		email: { type: String, required: true },
	},
	message: { type: String, required: true },
	timestamp: { type: String, required: true },
};

module.exports = chatSchema;