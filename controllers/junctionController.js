const { User, Post } = require("../db/models/");

const postLike = async (req, res) => {
  try {
    const { email, title } = req.body;

    const user = await User.findOne({ where: { email: email } });
    const user_id = user.id;

    const post = await Post.findOne({ where: { title: title } });
    const post_id = post.id;

    const result = await user.addLikes(post, {
      through: "Users_Likes",
    });

    console.log("Success");
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postLike };
