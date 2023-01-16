'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, { foreignKey: "post_id" });
      this.belongsTo(models.User, { as: "author", foreignKey: "user_id" });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
    underscored: true,
  });
  return Comment;
};