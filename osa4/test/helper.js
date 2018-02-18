const Blog = require('../model/blog');

const exampleData = [{
  title: 'low cohesion',
  url: 'https://www.medium.com/123456',
}, {
  title: 'billion unit tests',
  url: 'https://blogger.com/123445',
}];

const populateDb = async () => {
  await Blog.insertMany(exampleData);
};

const blogsInDb = async () => {
  return Blog.find();
};

const clearDb = async () => {
  return Blog.remove({ });
};

module.exports = {
  blogsInDb, clearDb, populateDb,
};
