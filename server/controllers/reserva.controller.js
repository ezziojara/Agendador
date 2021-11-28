const Reserva = require('../models/reserva.model');
const Horario = require('../models/horario.model');
var mongoose = require('mongoose');

module.exports.getReservaxDoctorxFecha = async (req, res) => {
    try{
        let { id, fecha } = req.params;
        const horarios = [];
        fecha = new Date(fecha);
        id = mongoose.Types.ObjectId(id);
        console.log(id)

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

        

        // horarioList = horarioList.find({})

        // const reservaList = await Reserva.find({ doctor: id, fecha: fecha });
        // const horarioList = await Horario.find();

        // horarioList?.map((horario)=>{
        //     reservaList?.map((reserva)=>{
        //         console.log("reserva.horario",reserva.horario)
        //         if(horario._id.toString() === reserva.horario.toString()){
        //             horario = { 
        //                         "_id": horario._id,
        //                         "orden": horario.orden,
        //                         "horaInicio": horario.horaInicio,
        //                         "horaFin": horario.horaFin,
        //                         "estado": horario.estado,
        //                         "disponible": false
        //                       }
        //         }
                
                
        //         horarios.push(horario)
        //     })
            
        // })

        // console.log('horarios',horarios);

        return res.json( horarioList );
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