const routes = require('express').Router();

require('dotenv').config()

const { 
  addUser,
  deleUser,
  listUsers,
  findUser
} = require('../controllers/user.controller');

routes.get('/list', listUsers);
routes.get('/find', findUser);

routes.post('/register', addUser);

routes.delete('/remove', deleUser);

module.exports = routes; 