const Reserva = require('../models/reserva.model');
const Horario = require('../models/horario.model');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

module.exports.getReservaxDoctorxFecha = async (req, res) => {
    try{
        let { id, fecha } = req.params;
        const horarios = [];
        fecha = new Date(fecha);
        id = mongoose.Types.ObjectId(id);

        let horarioList = await Horario.aggregate([
            
            { 
                $lookup: 
                { 
                    from: 'reservas',
                    localField: '_id',
                    foreignField: 'horario',
                    as: 'horarios'
                } 
            }, 
            {
              $project: 
                {
                    _id: 1,
                    orden:1,
                    horaInicio:1,
                    horaFin:1,
                    estado:1,
                    horarios: 
                    { 
                    $filter: 
                    { 
                        input: "$horarios", 
                        as: "pet", 
                        cond: {
                            $and: [
                                    {
                                    $in: [
                                        "$$pet.doctor",
                                        [id]
                                    ]
                                    },
                                    { $eq: ["$$pet.fecha", fecha] }
                                    ]
                        
                        }
                    } 
                    } 
                }
            } , 
            {
              $project: 
              {
                _id:1,
                orden:1,
                horaInicio:1,
                horaFin:1,
                estado:1,
                tieneReserva:{$size:'$horarios'}
              }
            }  
            
            
        ]);
        return res.json( horarioList );
    }catch(err){
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
        const deleteReserva =  await Reserva.deleteOne({_id: id});
        return res.json( deleteReserva );
    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.getReservaxPaciente = async (req, res) => {
    try{
        const { id, rut } = req.params;

        console.log('id',id)

        const reservaList = await Reserva.findOne({ _id: id }).populate('paciente').populate('horario','horaInicio').populate('doctor','name rut');

        if(reservaList){
            return reservaList.paciente.rut === rut ? res.json( reservaList ) : res.status(404).json( {msg: 'Rut no pertence a la reserva'} )
        }else{
            return res.status(402).json( {msg: 'No existe reserva.'} )
        }

        
    }catch(err){
        
        return res.status(500).json({msg:"no hay reserva asociada a la información",error: err});
    }
};

module.exports.enviarCorreoPaciente = async (req, res) => {
    try{
        const { id } = req.params;
        const reserva =  await Reserva.findOne({_id: id}).populate('paciente');
        console.log('reserva',reserva)
        
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'finalmernproject@gmail.com', // generated ethereal user
              pass: '6H}=nhwZ', // generated ethereal password
            },
          });

          let info = await transporter.sendMail({
            from: 'finalmernproject@gmail.com', // sender address
            to: reserva.paciente.email, // list of receivers
            subject: `Reserva numero: ${reserva._id}`,
            text: "Hello world?", // plain text body
            html: `<p>Estimado ${reserva.paciente.nombre} ${reserva.paciente.apellido}: <br> Se ha creado la siguiente reserva ${reserva._id}. <br> Para cancelar tu reserva puedes ir a: <a href="http://localhost:3000/buscar">Cancelar Reserva</a> </p>`, // html body
          });

        return res.json( info );

    }catch(err){
        console.log('err',err)
        return res.status(500).json({error: err});
    }
};