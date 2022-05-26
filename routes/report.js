const routes = require('express').Router();

const verifyJWT = require('../middleware/verifyAuth')
const { uploader } = require('../middleware/uploader');;

const { 
  addReport,
  listReports,
  executeReport,
  delReport,
  searchReport
} = require('../controllers/report.controller');

routes.get('/list', verifyJWT, listReports);

routes.get('/rep', verifyJWT, searchReport);

routes.get('/execute', verifyJWT, executeReport);

routes.post('/register', verifyJWT, uploader.single('sql'), addReport);

routes.delete('/remove', verifyJWT, delReport);

module.exports = routes;