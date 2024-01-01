const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

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

const initialUser = {
  username: 'root',
  password: 'nottellingyou',
};

const generateInitialUser = async () => {
  const plaintextPassword = 'nottellingyou';
  const passwordHash = await bcrypt.hash(plaintextPassword, 10);
  const user = new User({ username: 'root', name: 'groot', passwordHash });
  await user.save();
};

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb,
  generateInitialUser,
};
