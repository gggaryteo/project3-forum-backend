'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One post can have many Tags
      this.belongsToMany(models.Post, {
        through: "TagList",
        foreignKey: "tagName",
        timestamps: false,
      })
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'Tag',
    underscored: true,
    timestamps: false,
  });
  return Tag;
};