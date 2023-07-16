const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.sort((a, b) => b.likes - a.likes)[0];
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author');
  const maxKey = _.max(Object.keys(counts), (o) => counts[o]);
  return {
    author: maxKey,
    blogs: counts[maxKey],
  };
};

const mostLikes = (blogs) => {
  const mostLikesArray = _(blogs)
    .groupBy('author')
    .map((obj, key) => ({
      author: key,
      likes: _.sumBy(obj, 'likes'),
    }))
    .value();
    return mostLikesArray[0]
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
