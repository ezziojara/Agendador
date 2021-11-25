const mongoose = require("mongoose");

const HorarioSchema = new mongoose.Schema(
	{
        orden: {
			type: String,
			required: [true, "Orden es requerido"]
		},
		horaInicio: {
			type: String,
			required: [true, "Hora de inicio es requerido"]
		},
		horaFin: {
			type: String,
			required: [true, "Hora de fin es requerido"]
		},
		estado: {
			type: Boolean,
            default: true
		}
		
	},
	{ timestamps: true }
);

const Horario = mongoose.model("Horario", HorarioSchema);

module.exports = Horario;