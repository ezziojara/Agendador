const {AutenticaUsuario, createUsuario, getDoctorxEspecialidad} = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/aut/login',AutenticaUsuario);
    app.post('/api/aut/registrar',createUsuario);
    app.get('/api/aut/doctor/:id',getDoctorxEspecialidad);
}