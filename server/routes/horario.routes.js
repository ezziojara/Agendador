const {getAllHorario, createHorario} = require('../controllers/horario.controller');
const validaJWT = require('../middlewares/valida-jwt');

module.exports = (app) => {
    app.get('/api/horarios/', validaJWT ,getAllHorario);
    app.post('/api/horarios/new', validaJWT ,createHorario);
}