'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//MOSTRAR TODOS LOS USUARIOS
function index(req, res) {
  User.find({}, (err, users) => {
    res.status(200).send({
      users
    });
  })
}

/*CREATE User*/
function create(req, res) {
  var params = req.body; // obtener parametros
  var user = new User();
  if (params.name && params.surname && params.nick && params.email && params.password) {
    user.name = params.name;
    user.surname = params.surname;
    user.nick = params.nick;
    user.email = params.nick;
    user.role = 'ROLE_USER';
    user.image = null;

    /* COMPROBAR USUARIO DUPLICADO*/
    User.find({
      $or: [
        { email: user.email.toLowerCase() },
        { nick: user.nick.toLowerCase() }
      ]
    }).exec((err, users) => {
      if (err) return res.status(500).send({ message: "Error en la peticion de usuario" })
      if (users && users.length >= 1) {
        return res.status(200).send({
          message: "Existe un usario registrado con el mismo email"
        })
      } else {
        // encriptacion de password y guardar usuario
        bcrypt.hash(params.password, null, null, (err, hash) => {
          user.password = hash;
          user.save((err, userStore) => { // guardar usuario
            if (err) return res.status(500).send({ message: "Error al guardar el usuario" })
            if (userStore) {
              res.status(200).send({
                user: userStore
              })
            } else {
              res.status(404).send({
                message: "No se ha registrado el usuario"
              })
            }
          })
        });
      }
    });

  } else {
    res.status(200).send({
      message: "Faltan datos por enviar"
    })
  }
}

function loginUser(req, res) {
  var params = req.body; // obtener parametros del front
  var email = params.email;
  var password = params.password;

  User.findOne({ email: email }, (err, user) => {
    if (err) res.status(500).send({ message: "Error en la petición" }) // error en la peticion
    if (user) { // econtro un usuario en la BD
      bcrypt.compare(password, user.password, (err, check) => { // compara contraseña encriptada
        if (check) {
          if (params.getToken) {
            return res.status(200).send({
              token: jwt.createToken(user)
            });
          } else {
            user.password = undefined; // ocultar contraseña
            return res.status(200).send({ user });
          }
        } else {
          res.status(404).send({ message: "No se pudo iniciar sesión" })
        }
      });
    } else { // no encontro usuario en la BD
      res.status(404).send({ message: "El usuario no se ha podido indentificar" })
    }
  });

}


// exportacion de metodos
module.exports = {
  index,
  create,
  loginUser

}