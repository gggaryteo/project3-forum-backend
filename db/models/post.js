'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // One post belongs to one author
      this.belongsTo(models.user, { foreignKey: "userId", as: "author" });

      // One post can have many comments (1-M)
      this.hasMany(models.comment, { foreignKey: "postId"});

      // Tag list
      this.belongsToMany(models.tag, {
        through: "TagList",
        as: "tagList",
        foreignKey: "postId",
        timestamps: false,
      });
    }
  }
  Post.init({
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
    underscored: true,
  });
  return Post;
};