const Rol = require('../models/rol.model');

module.exports.createRol = async (req, res) => {
    try{
        
        const { body } = req;
        const newRol = await Rol.create(body)
        return res.json({ newRol })

    }catch(err){
        return res.status(500).json({error: err});
    }
}

module.exports.getAllRol = async (req, res) => {
    try{
        
        const rolList = await Rol.find();
        return res.json({ rolList });
    }catch(err){
        return res.status(500).json({error: err});
    }
};