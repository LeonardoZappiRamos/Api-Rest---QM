const fs = require('fs');

require('dotenv').config();

const dirname = process.env.DIR_REPORTS.toString();

const addReport = async (req, res) => {

  const report = {
    title: req.body.title,
    consult: dirname.toString()+'/'+req.body.title,
    role: req.body.role,
  }
  res.status(201).json(report)
}

module.exports.addReport = addReport

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

module.exports.listReports = listReports