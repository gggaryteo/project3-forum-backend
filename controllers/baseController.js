class BaseController {
  constructor(model) {
    this.model = model;
  }

  testRoute(_req, res) {
    return res.send("testing 123");
  }
}

module.exports = BaseController;
