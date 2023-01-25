const BaseController = require("./baseController");

class TagController extends BaseController {
  constructor(model, post) {
    super(model);
    this.post = post;
  }

  async getAllTag(req, res) {
    try {
      const test = await this.model.findAll({
        include: [
          {
            model: this.post,
            through: "TagList",
            as: "taglist",
          },
        ],
      });
      return res.json(test);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TagController;
