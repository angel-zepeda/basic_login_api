'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

// propiedades de la colection 'User' (propiedades de la 'tabla')
const userSchema = schema({
  name: String,
  surname: String,
  nick: String,
  email: String,
  password: String,
  role: String,
  image: String
});


// exportar nombre de la entidad, con los compos establecidos
module.exports = mongoose.model('User', userSchema);