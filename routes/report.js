const routes = require('express').Router();

const verifyJWT = require('../middleware/verifyAuth')

const { 
  addReport,
  listReports,
  executeReport
} = require('../controllers/report.controller');

routes.get('/list', verifyJWT, listReports);
routes.get('/execute', verifyJWT, executeReport);

routes.post('/register', addReport);

module.exports = routes;