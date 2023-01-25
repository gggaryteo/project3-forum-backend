// import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const io = require("socket.io")(3002, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// import middlewares
const errorHandler = require("./middleware/errorHandler");

// import models
const db = require("./db/models");
const { User, Post, Tag, Comment, Chats } = db;

//import controllers
const PostController = require("./controllers/postController");
const TagController = require("./controllers/tagController");
const ChatController = require("./controllers/chatController");
const JunctionController = require("./controllers/junctionController");

// initialize controllers
const postController = new PostController(Post, User);
const tagController = new TagController(Tag, Post);
const chatController = new ChatController(Chats);
const junctionController = new JunctionController(User, Post);

// import routers
const usersRoutes = require("./routers/users");
const userRoutes = require("./routers/user");
const PostRouter = require("./routers/postRouter");
const TagRouter = require("./routers/tagRouter");
const postsRoutes = require("./routers/posts");
const ChatRouter = require("./routers/chatRouter");
const JunctionRouter = require("./routers/junctionRouter");

// initialize routers // Have not put in AUTH yet
const postRouter = new PostRouter(postController).routes();
const tagRouter = new TagRouter(tagController).routes();
const chatRouter = new ChatRouter(chatController).routes();
const junctionRouter = new JunctionRouter(junctionController).routes();

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
app.use("/api/userpost", junctionRouter);
app.use("/api/post", postRouter);
app.use("/api/tag", tagRouter);
app.use("/api/posts", postsRoutes);
app.use("/api/chat", chatRouter);
app.use(errorHandler);

// Socket.io
io.on("connection", async (socket) => {
  console.log(socket.id);
  // const currentChat = await Chats.findAll()
  // socket.emit('retrive-chat', currentChat)

  socket.on("send-message", async (message, username) => {
    console.log(message, username);
    await Chats.create({
      message,
      user: username,
    });
    socket.broadcast.emit("receive-message", message, username);
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
