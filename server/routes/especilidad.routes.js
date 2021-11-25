const {getAllEspecialidad, createEspecialidad} = require('../controllers/especialidad.controller');
const validaJWT = require('../middlewares/valida-jwt');

module.exports = (app) => {
    app.get('/api/especialidades/', validaJWT ,getAllEspecialidad);
    app.post('/api/especialidades/new', validaJWT ,createEspecialidad);
}