const express = require("express");
const router = express.Router();

class tagRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // Request for tags table

    // http://localhost:3001/api/tag/getAll
    router.get("/getAll", this.controller.getAllTag.bind(this.controller));

    // router.use(this.auth);

    return router;
  }
}

module.exports = tagRouter;
