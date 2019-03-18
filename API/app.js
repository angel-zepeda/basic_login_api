'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user_routes = require('./routes/user'); // importar rutas de User


/* MIDLEWARE */
// convertir las peticiones a objetos JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/* RUTAS */
app.use('/api', user_routes);

//exportar configuración, cada archivo creado es un modulo del APP
module.exports = app;




