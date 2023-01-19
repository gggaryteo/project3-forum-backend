const BaseController = require("./baseController");

class PostController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getAllTag(req, res) {
    try {
      const posts = await this.model.findAll({
        attributes: ["tag_name"],
      });
      return res.json(posts);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PostController;
