const {getAllEspecialidad, createEspecialidad} = require('../controllers/especialidad.controller');


module.exports = (app) => {
    app.get('/api/especialidades/',getAllEspecialidad);
    app.post('/api/especialidades/new',createEspecialidad);
}