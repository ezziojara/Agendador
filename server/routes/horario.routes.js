const {getAllHorario, createHorario} = require('../controllers/horario.controller');


module.exports = (app) => {
    app.get('/api/horarios/',getAllHorario);
    app.post('/api/horarios/new',createHorario);
}