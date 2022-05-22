'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      this.hasOne(models.Role, {foreignKey: 'id_role', as: 'role' })
    }
  }

  Report.init({
    title: DataTypes.STRING,
    dir: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  
  return Report;
};