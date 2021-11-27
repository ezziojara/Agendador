const {getPacientexRut, createPaciente, UpdatePaciente} = require('../controllers/paciente.controller');
const validaJWTPaciente = require('../middlewares/valida-jwtPaciente');

module.exports = (app) => {
    app.get('/api/pacientes/:rut',validaJWTPaciente,getPacientexRut);
    app.post('/api/pacientes/new',createPaciente);
    app.put('/api/pacientes/update/:id',validaJWTPaciente,UpdatePaciente);
}