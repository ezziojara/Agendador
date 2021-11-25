const Especialidad = require('../models/especialidad.model');

module.exports.createEspecialidad = async (req, res) => {
    try{
        
        const { body } = req;
        const newEspecialidad = await Especialidad.create(body)
        return res.json({ newEspecialidad })

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.getAllEspecialidad = async (req, res) => {
    try{
        
        const especialidadList = await Especialidad.find();
        return res.json({ especialidadList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};