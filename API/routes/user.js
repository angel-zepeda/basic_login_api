'use strict'

const express = require('express');
const userController = require('../controllers/user');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.get('/users/index', userController.index);
api.post('/user/register', userController.create);
api.post('/user/login', userController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, userController.getUser);
api.put('/user/update/:id', md_auth.ensureAuth, userController.update);

module.exports = api;