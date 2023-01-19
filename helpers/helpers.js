const slugify = (string) => {
  return string.trim().toLowerCase().replace(/\W|_/g, "-");
};

const appendTagList = (postTags, post) => {
  const tagList = postTags.map((tag) => tag.name);

  if (!post) return tagList;
  post.dataValues.tagList = tagList;
};

module.exports = { slugify, appendTagList, appendFavorites, appendFollowers };
