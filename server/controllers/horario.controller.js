const Horario = require('../models/horario.model');

module.exports.createHorario = async (req, res) => {
    try{
        
        const { body } = req;
        const newHorario = await Horario.create(body)
        return res.json( newHorario )

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.getAllHorario = async (req, res) => {
    try{
        
        const horarioList = await Horario.find();
        return res.json( horarioList );
    }catch(err){
        return res.status(500).json({error: err});
    }
};