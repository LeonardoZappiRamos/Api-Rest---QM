const routes = require('express').Router();

require('dotenv').config()

const { 
  addRole,
  delRole,
  listRole
} = require('../controllers/role.controller');

routes.get('/', listRole);

routes.post('/register', addRole);

routes.delete('/remove', delRole);

module.exports = routes;