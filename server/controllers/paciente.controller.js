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
        let newPaciente = await Paciente.find({ rut: body.rut });

        // console.log('newPaciente',newPaciente.length );

        if(newPaciente.length === 0){
            newPaciente = await Paciente.create(body)
        }
        const token = await generaJWTPaciente(newPaciente._id)

        const paciente = {
            _id: newPaciente[0]._id,
            nombre: newPaciente[0].nombre,
            apellido: newPaciente[0].apellido,
            rut: newPaciente[0].rut,
            email: newPaciente[0].email,
            telefono: newPaciente[0].telefono,
            token:token
        }

        
        return res.json({ paciente })

    }catch(err){
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