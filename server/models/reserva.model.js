const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema(
	{
        paciente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paciente", 
            required: [true, "Paciente is required"]
        },
        horario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Horario", 
            required: [true, "Horario is required"]
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: [true, "Doctor is required"]
        },
		fecha: {
			type: Date,
			required: [true, "Fecha es requerido"]
		},
		estado: {
			type: Boolean,
            default: true
		}
		
	},
	{ timestamps: true }
);

const Reserva = mongoose.model("Reserva", ReservaSchema);

module.exports = Reserva;