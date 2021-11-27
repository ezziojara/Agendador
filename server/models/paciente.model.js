const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			default: "",
			// required: [true, "Nombre es requerido"],
			// minlength: [2, "Nombre debe tener al menos 2 caracteres"]
		},
        apellido: {
			type: String,
			default: "",
			// required: [true, "Apellido es requerido"],
			// minlength: [2, "Apellido debe tener al menos 2 caracteres"]
		},
		rut: {
			type: String,
			// required: [true, "Rut es requerido"],
			unique: true
			
		},
		telefono: {
			type: String,
			default: ""
			// required: [true, "Telefono es requerido"]
		},
		email: {
			type: String,
			default: ""
			// required: [true, "Email es requerido"]
		}
		
	},
	{ timestamps: true }
);

const Paciente = mongoose.model("Paciente", PacienteSchema);
module.exports = Paciente;