const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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

  test('blogs have an id key (rather than the _id key assigned by the database)', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).not.toBeDefined();
  });

  test('a specific note is within the returned blog', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((resp) => resp.title);
    expect(titles).toContain('salut');
  });

  test('a specific blog can be viewed with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultblog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultblog.body).toEqual(blogToView);
  });

  test('fails with statuscode 404 if blog does not exist (but id is valid via a previously deleted blog)', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('PUT blogs', () => {
  test('number of likes can be updated on a speciifc blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const update = { likes: 400 };

    expect(blogToUpdate.likes).toEqual(22);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)

      .send(update)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body[0].likes).toEqual(400);
  });
});

describe('POST blogs', () => {
  test('a valid blog can be added', async () => {
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

  test('blog without a title is not added', async () => {
    const newBlog = { author: 'rob van damme', url: 'rvd.com', likes: '22' };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blog without a url is not added', async () => {
    const newBlog = {
      title: 'one of a kind',
      author: 'rob van damme',
      likes: '22',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blog without likes key is added but the value defaults to 0', async () => {
    const newBlog = {
      title: 'one of a kind',
      author: 'rob van damme',
      url: 'rvd.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body[helper.initialBlogs.length].likes).toEqual(0);
  });
});

describe('DELETE blogs', () => {
  test('a blog can be deleted if the id is valid (returns 204)', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((resp) => resp.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
