"use strict";
const { Model } = require("sequelize");
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
      this.belongsTo(models.User, { foreignKey: "user_id", as: "author" });

      // One post can have many comments (1-M)
      this.hasMany(models.Comment, { foreignKey: "post_id" });

      // Tag list
      this.belongsToMany(models.Tag, {
        through: "TagList",
        as: "tagList",
        foreignKey: "post_id",
        timestamps: false,
      });

      // Favorites
      this.belongsToMany(models.User, {
        through: "Favorites",
        foreignKey: "post_id",
        timestamps: false,
      });

      // Users_Likes
      this.belongsToMany(models.User, {
        through: "Users_Likes",
        foreignKey: "post_id",
        timestamps: false,
      });
    }
  }
  Post.init(
    {
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Posts",
      underscored: true,
    }
  );
  return Post;
};
