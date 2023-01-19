const BaseController = require("./baseController");

class PostController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getAllPost(req, res) {
    try {
      const posts = await this.model.findAll();
      return res.json(posts);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PostController;
