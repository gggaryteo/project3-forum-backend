const BaseController = require("./baseController");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DB_DATABSE,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//   }
// );

class UserLikeController extends BaseController {
  constructor(model, post) {
    super(model);
    this.post = post;
  }

  async postUserLike(req, res) {
    try {
      const post_title = req.body.title;
      const email = req.body.email;

      //get user_id
      const user = await this.model.findOne({ where: { email: email } });
      //get post_id
      const post = await this.post.findOne({ where: { title: post_title } });

      await user.addPost(post);

      res.send("Success");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserLikeController;

// const userlikes = await sequelize.query(
//   `INSERT INTO Users_Likes (user_id, post_id) VALUES (${user_id}, '${post_id}')`,
//   { type: sequelize.QueryTypes.INSERT }
// );
