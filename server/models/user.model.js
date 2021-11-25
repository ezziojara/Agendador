const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Nombre es requerido"],
			minlength: [2, "Nombre debe tener al menos 2 caracteres"]
		},
		rut: {
			type: String,
			required: [true, "Rut es requerido"],
			// minlength: [2, "Nombre debe tener al menos 2 caracteres"]
		},
		telefono: {
			type: String,
			required: [true, "Telefono es requerido"]
		},
		email: {
			type: String,
			required: [true, "Email es requerido"],
			unique: true
		},
		password: {
			type: String,
            minlength: [4, "Contraseña debe tener al menos 4 caracteres"],
			required: [true, "Contraseña es requerido"]
		},
		estado: {
			type: Boolean,
            default: true
		},
        rol: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rol", 
            required: [true, "Rol is required"]
        },
        especialidad: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Especialidad", 
            required: [true, "Especialidad is required"]
        }]
		
	},
	{ timestamps: true }
);


UserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

const User = mongoose.model("User", UserSchema);

module.exports = User;