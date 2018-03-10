const express = require('../util/asyncExpress');
const bcrypt = require('bcrypt');
const User = require('../model/user');

const router = express.Router();

const HASH_ROUNDS = 10;

router.post('/', async (request, response) => {
  const {
    password, username, name, adult,
  } = request.body;

  if (password.length < 3) {
    response.status(400).json({ error: 'too short password' });
    return;
  }

  const prevUser = await User.findOne({ username });

  if (prevUser) {
    response.status(400).json({ error: 'username already taken' });
    return;
  }

  const hash = await bcrypt.hash(password, HASH_ROUNDS);

  const user = new User({
    hash,
    username,
    name,
    adult,
  });

  try {
    await user.save();
    await response.status(201).end();
  } catch (e) {
    console.error('sending 400 because:', e.message);
    await response.status(400).end();
  }
});

router.get('/', async (request, response) => {
  const users = await User.find()
    .populate('blogs', '-user')
    .select('-hash');

  await response.json(users);
});

module.exports = router;
