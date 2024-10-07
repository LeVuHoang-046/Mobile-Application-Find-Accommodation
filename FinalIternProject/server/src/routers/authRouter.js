/** @format */
const express = require('express');
const {register, login, getUserInformation} = require('../controllers/registerController');
const { getUsersByRole } = require('../controllers/userController');
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/user/me', getUserInformation);
authRouter.get('/users/role', getUsersByRole);

module.exports = authRouter;
