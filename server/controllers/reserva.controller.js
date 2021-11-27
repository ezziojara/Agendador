const Reserva = require('../models/reserva.model');

module.exports.getReservaxDoctorxFecha = async (req, res) => {
    try{
        let { id, fecha } = req.params;
        fecha = new Date(fecha);
        const reservaList = await Reserva.find({ doctor: id, fecha: fecha });
        
        return res.json( reservaList );
    }catch(err){
        console.log("err",err)
        return res.status(500).json({error: err});
    }
};

module.exports.createReserva = async (req, res) => {
    try{
        
        const { body } = req;
        const newReserva = await Reserva.create(body)
        return res.json( newReserva )

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.UpdateReserva = async (req, res) => {
    try{
        const { id } = req.params;
        const updateReserva =  await Reserva.findByIdAndUpdate({_id: id},req.body,{new: true});
        return res.json( updateReserva );

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.deleteReserva = async (req, res) => {
    try{
        const { id } = req.params;
        const deleteReserva =  await Conductor.deleteOne({_id: id});
        return res.json( deleteReserva );
    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.getReservaxPaciente = async (req, res) => {
    try{
        const { paciente_id, reserva_id } = req.params;
        const reservaList = await Reserva.find({ _id: reserva_id, paciente: paciente_id, });
        
        return res.json( reservaList );
    }catch(err){
        return res.status(500).json({error: err});
    }
};