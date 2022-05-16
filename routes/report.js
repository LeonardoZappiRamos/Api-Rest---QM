const routes = require('express').Router();

const verifyJWT = require('../middleware/verifyAuth')

routes.get('/', verifyJWT, (req, res) =>{
  res.send({
    "name": "Faturamento Diário",
    "Role": "Faturamento"
  })
})

module.exports = routes;