const {getAllRol, createRol} = require('../controllers/rol.controller');
const validaJWT = require('../middlewares/valida-jwt');

module.exports = (app) => {
    app.get('/api/roles/', validaJWT ,getAllRol);
    app.post('/api/roles/new', validaJWT ,createRol);
}