"use strict";
const { Model } = require("sequelize");
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
      this.hasMany(models.Post, { foreignKey: "user_id" });

      // One user can have Many Comments (1-M)
      this.hasMany(models.Comment, { foreignKey: "post_id" });

      // User can favorite many posts
      this.belongsToMany(models.Post, {
        through: "Favorites",
        as: "favorites",
        foreignKey: "user_id",
        timestamps: false,
      });

      this.belongsToMany(models.Post, {
        through: "Users_Likes",
        as: "likes",
        foreignKey: "user_id",
        timestamps: false,
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      };
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      biography: DataTypes.TEXT,
      profileimg: DataTypes.TEXT,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "Users",
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
