'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chats.init({
    message: DataTypes.STRING,
    user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chats',
    tableName: 'Chats',
    underscored: true,
  });
  return Chats;
};