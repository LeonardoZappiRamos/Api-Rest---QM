const routes = require('express').Router();
const multer = require('multer');
const verifyJWT = require('../middleware/verifyAuth')

const uploader = multer({dest: 'src/'});

const { 
  addReport,
  listReports,
  executeReport,
  delReport,
  searchReport
} = require('../controllers/report.controller');

routes.get('/list', listReports);

routes.get('/rep', searchReport);

routes.get('/execute', executeReport);

routes.post('/register', uploader.single('sql'), addReport);

routes.delete('/remove', delReport);

module.exports = routes;