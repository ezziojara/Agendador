const express = require('express');
const app = express();
const cors = require('cors');
// const port = 8000;
require('dotenv').config();
require('./server/config/mongoose.config');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./server/routes/user.routes');
const especialidadRoutes = require('./server/routes/especilidad.routes');
const horarioRoutes = require('./server/routes/horario.routes');
const rolRoutes = require('./server/routes/rol.routes');
const pacienteRoutes = require('./server/routes/paciente.routes');
const reservaRoutes = require('./server/routes/reserva.routes');

userRoutes(app);
especialidadRoutes(app);
horarioRoutes(app);
rolRoutes(app);
pacienteRoutes(app);
reservaRoutes(app);

app.listen(process.env.PORT, () => console.log('Im listening so cool!'))