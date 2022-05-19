const routes = require('express').Router();

const verifyJWT = require('../middleware/verifyAuth')

const { 
  addReport,
  listReports 
} = require('../controllers/report.controller');

routes.get('/', verifyJWT, (req, res) =>{
  res.send({
    "name": "Faturamento Diário",
    "Role": "Faturamento"
  })
})

routes.get('/list', listReports)
routes.post('/register', addReport)

module.exports = routes;