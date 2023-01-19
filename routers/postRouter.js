const express = require("express");
const router = express.Router();

class postRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    // Request for posts table

    // http://localhost:3001/api/post/getAll
    router.get("/getAll", this.controller.getAllPost.bind(this.controller));

    // router.use(this.auth);

    return router;
  }
}

module.exports = postRouter;
