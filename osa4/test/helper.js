const supertest = require('supertest');

const Blog = require('../model/blog');
const User = require('../model/user');
const createServer = require('../server');

const blogsInDb = async () => {
  return Blog.find();
};

const clearDb = async () => {
  await Blog.remove({ });
  await User.remove({ });
};

const createApi = async () => {
  const { app, close } = await createServer();
  return { api: supertest(app), close };
};

module.exports = {
  blogsInDb, clearDb, createApi,
};
