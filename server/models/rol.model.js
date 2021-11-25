const mongoose = require("mongoose");

const RolSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true, "Nombre es requerido"],
			minlength: [2, "Nombre debe tener al menos 2 caracteres"]
		},
		estado: {
			type: Boolean,
            default: true
		}
		
	},
	{ timestamps: true }
);

const Rol = mongoose.model("Rol", RolSchema);

module.exports = Rol;