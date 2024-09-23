/** @format */
const express = require('express');
const {register, login, getUserInformation} = require('../controllers/registerController')
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/user/me', getUserInformation);

module.exports = authRouter;
