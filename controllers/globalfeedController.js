const BaseController = require("./baseController");

class GlobalFeedController extends BaseController {
  constructor(model, tag) {
    super(model);
    this.tag = tag;
  }

  async getAllPost(req, res) {
    try {
      const posts = await this.model.findAll();
      return res.json(posts);
    } catch (err) {
      console.log(err);
    }
  }
  async getAllTags(req, res) {
    try {
      console.log("Hello");
      const tags = await this.tag.findAll({
        attributes: ["tag_name"],
      });
      return res.json(tags);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GlobalFeedController;
