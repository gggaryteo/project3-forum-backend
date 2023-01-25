const express = require("express");
const router = express.Router();

class postRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // Request for posts table

    // http://localhost:3001/api/post/getAll
    router.get("/getAll", this.controller.getAllPost.bind(this.controller));

    //http://localhost:3001/api/post/:currentUserEmail
    router.get(
      "/:user_email",
      this.controller.getUserPost.bind(this.controller)
    );

    // router.use(this.auth);

    return router;
  }
}

module.exports = postRouter;
