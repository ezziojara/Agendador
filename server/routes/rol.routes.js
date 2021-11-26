const {getAllRol, createRol} = require('../controllers/rol.controller');


module.exports = (app) => {
    app.get('/api/roles/',getAllRol);
    app.post('/api/roles/new',createRol);
}