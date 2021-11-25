const {getReservaxDoctorxFecha, createReserva, UpdateReserva, deleteReserva} = require('../controllers/reserva.controller');
const validaJWT = require('../middlewares/valida-jwt');

module.exports = (app) => {
    app.get('/api/reservas/:id:fecha', validaJWT ,getReservaxDoctorxFecha);
    app.post('/api/reservas/new', validaJWT ,createReserva);
    app.put('/api/reservas/update/:id', validaJWT ,UpdateReserva);
    app.delete('/api/reservas/delete/:id', validaJWT ,deleteReserva);
}