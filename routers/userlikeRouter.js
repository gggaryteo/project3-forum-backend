const express = require("express");
const router = express.Router();

class userlikeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // http://localhost:3001/api/userlike/post
    // data = {"email" : "", "title": ""}
    router.post("/post", this.controller.postUserLike.bind(this.controller));

    return router;
  }
}

module.exports = userlikeRouter;
