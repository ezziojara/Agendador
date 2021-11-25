const Reserva = require('../models/reserva.model');

module.exports.getReservaxDoctorxFecha = async (req, res) => {
    try{
        const { doctor_id, fecha } = req.params;
        const reservaList = await Reserva.find({ doctor: doctor_id, fecha: fecha });
        
        return res.json({ reservaList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};

module.exports.createReserva = async (req, res) => {
    try{
        
        const { body } = req;
        const newReserva = await Reserva.create(body)
        return res.json({ newReserva })

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.UpdateReserva = async (req, res) => {
    try{
        const { id } = req.params;
        const updateReserva =  await Reserva.findByIdAndUpdate({_id: id},req.body,{new: true});
        return res.json({msg: 'Se ha actualizado correctamente', updateReserva});

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.deleteReserva = async (req, res) => {
    try{
        const { id } = req.params;
        const deleteReserva =  await Conductor.deleteOne({_id: id});
        return res.json({msg: 'Se ha borrado pirata exitosamente', reserva: deleteReserva});
    }catch(err){
        return res.status(500).json({error: err});
    }
}