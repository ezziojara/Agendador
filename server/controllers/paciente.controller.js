const Paciente = require('../models/paciente.model');

module.exports.getPacientexRut = async (req, res) => {
    try{
        const { rut } = req.params;
        const pacienteList = await Paciente.find({ rut: id });
        
        return res.json({ pacienteList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};

module.exports.createPaciente = async (req, res) => {
    try{
        
        const { body } = req;
        const newPaciente = await Paciente.create(body)
        return res.json({ newPaciente })

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