const {getPacientexRut, createPaciente, UpdatePaciente} = require('../controllers/paciente.controller');


module.exports = (app) => {
    app.get('/api/pacientes/:rut',getPacientexRut);
    app.post('/api/pacientes/new',createPaciente);
    app.put('/api/pacientes/update/:id',UpdatePaciente);
}