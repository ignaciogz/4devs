const authSchema = {
	email: { type: String, required: true },
	password: { type: String, required: true },
	nombre: { type: String, required: true },
	direccion: { type: String, required: true },
	edad: { type: Number, required: true },
	telefono: { type: Number, required: true },
	foto: { type: String, required: true }
};

module.exports = authSchema;