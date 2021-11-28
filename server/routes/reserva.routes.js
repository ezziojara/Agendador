const {getReservaxDoctorxFecha, createReserva, UpdateReserva, deleteReserva, getReservaxPaciente} = require('../controllers/reserva.controller');
const validaJWTPaciente = require('../middlewares/valida-jwtPaciente');

module.exports = (app) => {
    app.get('/api/reservas/:id/:fecha',getReservaxDoctorxFecha);
    app.post('/api/reservas/new', validaJWTPaciente ,createReserva);
    app.put('/api/reservas/update/:id' ,UpdateReserva);
    app.delete('/api/reservas/delete/:id' ,deleteReserva);
    app.get('/api/reservas/paciente/:id/:rut',validaJWTPaciente,getReservaxPaciente);

}