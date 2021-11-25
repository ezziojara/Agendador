const {getPacientexRut, createPaciente, UpdatePaciente} = require('../controllers/paciente.controller');
const validaJWT = require('../middlewares/valida-jwt');

module.exports = (app) => {
    app.get('/api/pacientes/:rut', validaJWT ,getPacientexRut);
    app.post('/api/pacientes/new', validaJWT ,createPaciente);
    app.put('/api/pacientes/update/:id', validaJWT ,UpdatePaciente);
}