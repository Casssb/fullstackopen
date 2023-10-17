const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper')

const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe(' GET blogs', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific note is within the returned blog', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((resp) => resp.title);
    expect(titles).toContain('salut');
  });

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultblog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(resultblog.body).toEqual(blogToView)
  })
});

describe('PUT blogs', () => {
  test('a valid note can be added', async () => {
    const newBlog = {
      title: 'hallo',
      author: 'reich rossteiger',
      url: 'thejoyofpainting.de',
      likes: '22',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((resp) => resp.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('hallo');
  });

  test('blog without content is not added', async () => {
    const newBlog = {author: "rob van damme"};

    await api.post('/api/blogs').send(newBlog).expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
