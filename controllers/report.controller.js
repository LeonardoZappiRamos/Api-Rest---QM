const Models = require('../models');
const path = require('path');
const fs = require('fs');

const { close, execute } = require('../database/oracledb/index');

const Report = Models.Report;

require('dotenv').config();

const Dir = path.resolve('../');

const addReport = async (req, res) => {
  const sqlLocal = path.join(Dir,req.file.path)
  const rep = {
    title: req.body.title,
    consulting: sqlLocal,
    role: req.body.role,
  }
  if(rep.title == null || rep.title == undefined){
    return res.status(400).json({"message": "The title is required"})
  } 
  if(rep.consulting == null || rep.consulting == undefined){
    return res.status(400).json({"message": "The consulting is required"})
  } 
  if(rep.role == null || rep.role == undefined){
    return res.status(400).json({"message": "The role is required"})
  } 
  try{  
    await Report.create(rep);
    res.sendStatus(201)
    //res.json(rep)
  }catch(err){
    res.status(500).json({"message": "Report was not created","Error": err.message})
  }
}

const listReports = async (req, res) => {
  try {
    const reports = await Report.findAll({where:{role: req.body.role}})
    res.status(200).json(reports);
  }catch (err) {
    res.status(500).send(err.stack);
  }
};

const searchReport = async (req, res) => {
  res.status(200).json({message: "Mensagem de Teste"})
};

const delReport = async (req, res) => {
  try {
    const report = await Report.findOne({where: {id: req.body.id}})
    await Report.destroy({where: {id: report.id}})
    res.sendStatus(206);
  }catch(err) {
    if(err) throw err.message;
  }
};

const executeReport = async (req, res) => {
  try {
    const report = await Report.findOne({where: {id: req.body.id}})
    const dir =  report.consulting
    const data = fs.readFileSync(dir, 'utf8').toString();
    //const teste = 'SELECT * FROM DUAL'
    const result = await execute(data)
    await close();
    res.status(200).json(result)
  }catch(err) {
    if(err) throw err.message;
      res.status(404).send(err.message);
  }
};

module.exports.listReports = listReports;
module.exports.addReport = addReport;
module.exports.executeReport = executeReport;
module.exports.delReport = delReport;
module.exports.searchReport = searchReport;