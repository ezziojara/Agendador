const mongoose = require("mongoose");

const EspecialidadSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true, "Nombre es requerido"],
			minlength: [2, "Nombre debe tener al menos 2 caracteres"]
		},
        descripcion: {
			type: String,
			// required: [true, "Nombre es requerido"],
			minlength: [2, "descripcion debe tener al menos 2 caracteres"]
		},
		estado: {
			type: Boolean,
            default: true
		}
		
	},
	{ timestamps: true }
);

const Especialidad = mongoose.model("Especialidad", EspecialidadSchema);

module.exports = Especialidad;