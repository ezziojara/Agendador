const Paciente = require('../models/paciente.model');
const { generaJWTPaciente } = require('../helpers/jwtPaciente');

module.exports.getPacientexRut = async (req, res) => {
    try{
        const { rut } = req.params;
        const pacienteList = await Paciente.find({ rut: rut });
        
        return res.json({ pacienteList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};

module.exports.createPaciente = async (req, res) => {
    try{
        
        const { body } = req;
        let newPaciente = await Paciente.findOne({ rut: body.rut });

        // console.log('newPacienteFind',newPaciente );

        if(!newPaciente){
            newPaciente = await Paciente.create(body)
        }

        // console.log('newPaciente',newPaciente );

        const token = await generaJWTPaciente(newPaciente._id)
        
        const paciente = {
            _id: newPaciente._id,
            nombre: newPaciente.nombre,
            apellido: newPaciente.apellido,
            rut: newPaciente.rut,
            email: newPaciente.email,
            telefono: newPaciente.telefono,
            token:token
        }

        
        return res.json({ paciente })

    }catch(err){
        // console.log('error',err );
        return res.status(500).json({error: err});
    }
}

module.exports.UpdatePaciente = async (req, res) => {
    try{
        const { id } = req.params;
        const updatePaciente =  await Paciente.findByIdAndUpdate({_id: id},req.body,{new: true});
        return res.json({msg: 'Se ha actualizado correctamente', updatePaciente});

    }catch(err){
        return res.status(500).json({error: err});
    }
}