'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // One user can have Many Posts (1-M)
      this.hasMany(models.post, {foreignKey: "userId"});

      // One user can have Many Comments (1-M)
      this.hasMany(models.comment, {foreignKey: "postId"})
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    biography: DataTypes.TEXT,
    profileimg: DataTypes.TEXT,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });
  return User;
};