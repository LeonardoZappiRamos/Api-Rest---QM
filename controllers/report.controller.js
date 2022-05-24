const Models = require('../models');
const fs = require('fs');
const multer = require('multer');
const { init } = require('../database/oracledb/index');

const Report = Models.Report;

require('dotenv').config();

const dirname = process.env.DIR_REPORTS.toString();

const addReport = async (req, res) => {
  const sql  = req.body.sql;

  const report = {
    title: req.body.title,
    consult: 'teste',
    role: req.body.role,
  }

  res.status(200).json({report, sql})
}

const listReports = async (req, res) => {
  const role = req.body.Role;
  console.log(role);
  try {
    const pasta = [];
    fs.readdir(dirname, (err, dir) => {
      dir.forEach(dirf => {
          fs.readdir(dirname+'/'+dirf, (err, files) => {
            if(dirf == role){
              files.forEach(file => {
                pasta.push(file);
              })
            res.status(200).json({
              "Quantidade": pasta.length,
              "Relatorios": pasta
            });
            }
          })
      })
    })
  }catch (err) {
    res.status(500).send(err.stack);
  }

};

const searchReport = (req, res) => {
  res.status(200).json({message: "Mensagem de Teste"})
};

const delReport = (req, res) => {
  res.status(200).json({message: "Mensagem de Teste"})
};

const executeReport = (req, res) => {
  res.status(200).json({message: "Mensagem de Teste"})
};

module.exports.listReports = listReports;
module.exports.addReport = addReport;
module.exports.executeReport = executeReport;
module.exports.delReport = delReport;
module.exports.searchReport = searchReport;