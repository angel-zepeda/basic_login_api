'use strict'

const express = require('express');
const userController = require('../controllers/user');
const api = express.Router();

api.get('/users/index', userController.index);
api.post('/user/register', userController.create);
api.post('/user/login', userController.loginUser);

module.exports = api;