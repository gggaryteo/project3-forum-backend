const express = require("express");
const router = express.Router();

class userlikeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // http://localhost:3001/api/userpost/

    // Routers for User - Likes table
    router.get(
      "/getLikeStatus/:data",
      this.controller.getUserLike.bind(this.controller)
    );

    router.post(
      "/like/post",
      this.controller.postUserLike.bind(this.controller)
    );

    router.delete(
      "/like/:data",
      this.controller.deleteUserLike.bind(this.controller)
    );

    // Routers for User - Favorite table

    router.get(
      "/getFavStatus/:data",
      this.controller.getUserFav.bind(this.controller)
    );

    router.post("/fav/post", this.controller.postUserFav.bind(this.controller));

    router.delete(
      "/fav/:data",
      this.controller.deleteUserFav.bind(this.controller)
    );

    return router;
  }
}

module.exports = userlikeRouter;
