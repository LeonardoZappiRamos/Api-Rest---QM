'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' })
    }
  }
  Token.init({
    token_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};