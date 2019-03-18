'use strict' // usar nuevas caracteristicas de JS (E6) =>
const mongoose = require('mongoose');
const app = require('./app'); // aquí esta expressJS
const port = 3000;

//conectar a la BD creada
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean', { useNewUrlParser: true })
  .then(() => {
    console.log("Se conectó exitosamente");
    // crear servidor despues de conectar exitosamente con la BD
    app.listen(port, () => {
      console.log("Servidor corriendo en puerto: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  })





