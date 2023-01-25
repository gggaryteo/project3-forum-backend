const BaseController = require("./baseController");

class PostController extends BaseController {
  constructor(model, user) {
    super(model);
    this.user = user;
  }

  async getAllPost(req, res) {
    try {
      const posts = await this.model.findAll();
      return res.json(posts);
    } catch (err) {
      console.log(err);
    }
  }

  async getUserPost(req, res) {
    try {
      const { user_email } = req.params;
      const userInfo = await this.user.findOne({
        where: { email: user_email },
      });
      const userId = userInfo.id;

      const userPosts = await this.model.findAll({
        where: { user_id: userId },
      });
      return res.json(userPosts);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PostController;
