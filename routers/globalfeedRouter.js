const express = require("express");
const router = express.Router();

class GlobalFeedRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    // Request for posts table

    // http://localhost:3001/homepage/posts
    router.get("/posts", this.controller.getAllPost.bind(this.controller));

    // router.use(this.auth);

    // Request for tags table

    // http://localhost:3001/homepage/tags
    router.get("/tags", this.controller.getAllTags.bind(this.controller));

    return router;
  }
}

module.exports = GlobalFeedRouter;
