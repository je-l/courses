const router = require('express').Router();
const Blog = require('../model/blog');

router.get('/', async (request, response) => {
  const allBlogs = await Blog.find({});
  response.json(allBlogs);
});

router.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (e) {
    response.status(400).end();
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    await Blog.findByIdAndRemove(id);
    response.status(200).end();
  } catch (e) {
    response.status(404).end();
  }
});

router.patch('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndUpdate(id, request.body);
    response.status(200).end();
  } catch (e) {
    response.status(404).end();
  }
});

module.exports = router;
