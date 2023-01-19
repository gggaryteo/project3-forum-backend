// import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import middlewares
const errorHandler = require("./middleware/errorHandler");

// import models
const db = require("./db/models");
const { User, Post, Tag, Comment } = db;

//import controllers
const PostController = require("./controllers/postController");

// initialize controllers
const postController = new PostController(Post);

// import routers
const usersRoutes = require("./routers/users");
const userRoutes = require("./routers/user");
const PostRouter = require("./routers/postRouter");

// initialize routers // Have not put in AUTH yet
const postRouter = new PostRouter(postController).routes();

// Putting express & cors together below this line
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PORT
const PORT = process.env.PORT || 3001;

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
