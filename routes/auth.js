const routes = require('express').Router();

require('dotenv').config()

const { loginUser, logoutUser, refreshToken } = require('../controllers/auth.controller');

routes.post('/login', loginUser)
routes.post('/refresh', refreshToken);

routes.delete('/logout', logoutUser);

module.exports = routes;