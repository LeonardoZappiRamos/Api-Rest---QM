'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(__dirname, '../config/config.json'));

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'test';
const db = {};

require('dotenv').config();

let sequelize;


if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config["development"]);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
