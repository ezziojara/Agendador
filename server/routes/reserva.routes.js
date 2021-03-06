const {getReservaxDoctorxFecha, createReserva, UpdateReserva, deleteReserva, getReservaxPaciente, enviarCorreoPaciente, getReservaxDoctorxFechaGrilla} = require('../controllers/reserva.controller');
const validaJWTPaciente = require('../middlewares/valida-jwtPaciente');

module.exports = (app) => {
    app.get('/api/reservas/enviarCorreoPaciente/:id' ,enviarCorreoPaciente);
    app.get('/api/reservas/reservaGrilla/:id/:fecha' ,getReservaxDoctorxFechaGrilla);
    app.get('/api/reservas/:id/:fecha',getReservaxDoctorxFecha);
    app.post('/api/reservas/new', validaJWTPaciente ,createReserva);
    app.put('/api/reservas/update/:id' ,UpdateReserva);
    app.delete('/api/reservas/delete/:id' ,deleteReserva);
    app.get('/api/reservas/paciente/:id/:rut' ,getReservaxPaciente);
    

}