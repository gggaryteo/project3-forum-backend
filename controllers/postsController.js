const { AlreadyTakenError, FieldRequiredError, ForbiddenError, NotFoundError, UnauthorizedError} = require("../helpers/customError");

const {
  appendTagList,
  slugify,
} = require("../helpers/helpers");

const { Post, Tag, User } = require("../db/models");
const { post } = require("../routers/users");

const includeOptions = [
  { model: Tag, as: "tagList", attributes: ["name"] },
  { model: User, as: "author", attributes: { exclude: ["email"] } },
];

// Get All Posts - By Author, Tag, Favorites

const allPosts = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    const { author, tag, favorited, limit = 3, offset = 0} = req.query;
    const searchOptions = {
      include: [
        {
          model: Tag,
          as: "tagList",
          attributes: ["name"],
          ...(tag && { where: { name: tag } }),
        },
        {
          model: User,
          as: "author",
          attributes: { exclude: ["email"] },
          ...(author && { where: { username: author } }),
        },
      ],
      limit: parseInt(limit),
      offset: offset * limit,
      order: [["createdAt", "DESC"]],
    };

    let posts =  { rows: [], count : 0 };
    if (favorited) {
      const user = await User.findOne({ where:  { username: favorited }});
      
      posts.rows = await user.getFavorites(searchOptions);
      posts.count = await user.countFavorites();
    } else {
      posts = await Post.findAndCountAll(searchOptions);
    }

    for ( let post of posts.rows) {
      const postTags = await post.getTagList();
      appendTagList(postTags, post);
    }

    res.json({ posts: posts.rows, postsCount: posts.count });
  } catch(err) {
    next(err)
  }
};

// Create Post
const createPost = async (req, res, next) => {
  try {
    const { loggedUser } = req;
    if (!loggedUser) throw new UnauthorizedError();

    const { title, description, content, tagList } = req.body.post;
    if (!title) throw new FieldRequiredError("A title");
    if (!description) throw new FieldRequiredError("A description");
    if (!content) throw new FieldRequiredError("A post content");

    const slug = slugify(title);
    const slugInDB = await Post.findOne({ where: { slug: slug } });
    if (slugInDB) throw new AlreadyTakenError("Title");

    const post = await Post.create({
      slug: slug,
      title: title,
      description: description,
      content: content,
    });

    for (const tag of tagList) {
      const tagInDB = await Tag.findByPk(tag.trim());

      if (tagInDB) {
        await post.addTagList(tagInDB);
      } else if (tag.length > 2) {
        const newTag = await Tag.create({ name: tag.trim() });

        await post.addTagList(newTag);
      }
    }

    delete loggedUser.dataValues.token;

    post.dataValues.tagList = tagList;
    post.setAuthor(loggedUser);
    post.dataValues.author = loggedUser;
    // await appendFollowers(loggedUser, loggedUser);
    // await appendFavorites(loggedUser, post);

    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  allPosts,
  createPost
}