const routes = require('express').Router();

require('dotenv').config()

const { 
  addUser,
  deleUser
} = require('../controllers/user.controller');

routes.post('/register', addUser);

routes.delete('/deleted', deleUser);

module.exports = routes;