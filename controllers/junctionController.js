const BaseController = require("./baseController");

class UserLikeController extends BaseController {
  constructor(model, post) {
    super(model);
    this.post = post;
  }

  async getUserLike(req, res) {
    try {
      const query = require("querystring").parse(req.params.data);
      const email = query.email;
      const post_id = query.post_id;

      const user = await this.model.findOne({ where: { email: email } });
      const post = await this.post.findByPk(post_id);

      const result = await user.hasLikes(post, { through: "Users_Likes" });
      // result return boolean value
      return res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async postUserLike(req, res) {
    try {
      const { email, post_id } = req.body;

      //get user_id
      const user = await this.model.findOne({ where: { email: email } });
      //get post_id
      const post = await this.post.findByPk(post_id);

      const result = await user.addLikes(post, {
        through: "Users_Likes",
      });

      res.send("Success");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUserLike(req, res) {
    try {
      const query = require("querystring").parse(req.params.data);
      const email = query.email;
      const post_id = query.post_id;

      //get user_id
      const user = await this.model.findOne({ where: { email: email } });
      //get post_id
      const post = await this.post.findByPk(post_id);

      const result = await user.removeLikes(post, {
        through: "Users_Likes",
      });

      res.send("Success");
    } catch (err) {
      console.log(err);
    }
  }

  /////////////////////////////////////////////////////////////////////////
  async getUserFav(req, res) {
    try {
      const query = require("querystring").parse(req.params.data);
      const email = query.email;
      const post_id = query.post_id;

      const user = await this.model.findOne({ where: { email: email } });
      const post = await this.post.findByPk(post_id);

      const result = await user.hasFavorites(post, { through: "Favorites" });
      // result return boolean value
      return res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async postUserFav(req, res) {
    try {
      const { email, post_id } = req.body;

      //get user_id
      const user = await this.model.findOne({ where: { email: email } });
      //get post_id
      const post = await this.post.findByPk(post_id);

      const result = await user.addFavorites(post, {
        through: "Favorites",
      });

      res.send("Success");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUserFav(req, res) {
    try {
      const query = require("querystring").parse(req.params.data);
      const email = query.email;
      const post_id = query.post_id;

      //get user_id
      const user = await this.model.findOne({ where: { email: email } });
      //get post_id
      const post = await this.post.findByPk(post_id);

      const result = await user.removeFavorites(post, {
        through: "Favorites",
      });

      res.send("Success");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserLikeController;
