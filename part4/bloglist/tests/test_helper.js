const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'hola',
    author: 'beto rossa',
    url: 'thejoyofpainting.esp',
    likes: '22',
  },
  {
    title: 'salut',
    author: 'bobette ross',
    url: 'thejoyofpainting.fr',
    likes: '2',
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'notaurl' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
