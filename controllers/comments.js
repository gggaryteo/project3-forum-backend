const {
  NotFoundError,
  UnauthorizedError,
  FieldRequiredError,
  ForbiddenError,
} = require("../helpers/customError");
// const { appendFollowers } = require("../helpers/helpers");
const { Post, Comment, User } = require("../db/models")

//? All Comments for Post
const allComments = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    const { slug } = req.params;

    const post = await Post.findOne({ where: { slug: slug } });
    if (!post) throw new NotFoundError("Post");

    const comments = await post.getComments({
      include: [
        { model: User, as: "author", attributes: { exclude: ["email"] } },
      ],
    });

    // for (const comment of comments) {
    //   await appendFollowers(loggedUser, comment);
    // }

    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

//* Create Comment for Post
const createComment = async (req, res, next) => {
  console.log(req.body.comment)
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { content } = req.body.comment;
    if (!content) throw new FieldRequiredError("Comment content");

    const { slug } = req.params;
    const post = await Post.findOne({ where: { slug: slug } });
    if (!post) throw new NotFoundError("Post");

    const comment = await Comment.create({
      content: content,
      post_id: post.id,
      user_id: loggedUser.id,
    });

    delete loggedUser.dataValues.token;
    comment.dataValues.author = loggedUser;
    // await appendFollowers(loggedUser, loggedUser);

    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

//* Delete Comment for Post
const deleteComment = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { slug, commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) throw new NotFoundError("Comment");

    if (loggedUser.id !== comment.user_id) {
      throw new ForbiddenError("comment");
    }

    await comment.destroy();

    res.json({ message: { body: ["Comment deleted successfully"] } });
  } catch (error) {
    next(error);
  }
};

module.exports = { allComments, createComment, deleteComment };
