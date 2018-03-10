const router = require('../util/asyncExpress').Router();
const Blog = require('../model/blog');

router.get('/', async (request, response) => {
  const allBlogs = await Blog
    .find()
    .populate('user', '-hash -blogs');

  response.json(allBlogs);
});

router.get('/:id', async (req, res) => {
  try {
    const b = await Blog.findById(req.params.id);
    res.status(200).send(b);
    return;
  } catch (e) {
    res.status(404).send({ error: 'no blog with id' });
  }
});

router.post('/', async (req, res) => {
  const { user } = req;

  if (!user) {
    res.status(401).json({ error: 'token invalid' });
    return;
  }

  const blog = new Blog({ ...req.body, user: user._id });
  try {
    const result = await blog.save();
    user.blogs.push(blog);
    await user.save();
    res.status(201).json(result);
  } catch (e) {
    res.status(400).end();
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const { user } = request;

  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (e) {
    response.status(404).end();
    return;
  }

  if (blog.user.equals(user._id)) {
    await blog.remove();
    response.status(200).end();
  } else {
    response.status(401).json({ error: 'cannot remove if not author' });
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
