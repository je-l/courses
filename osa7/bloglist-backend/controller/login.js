const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('../util/asyncExpress').Router();
const User = require('../model/user');
require('dotenv').config();


router.post('/', async (req, res) => {
  const { body: { username: reqUsername, password: reqPassword } } = req;
  if (!reqUsername || !reqPassword) {
    res
      .status(400)
      .send({ error: 'username and password required' });
    return;
  }

  const {
    hash, username, name, _id,
  } = await User.findOne({ username: reqUsername }) || {};

  if (!username) {
    res.status(404).send({ error: 'user not found' });
    return;
  }

  const passwordCorrect = await bcrypt.compare(reqPassword, hash);

  if (!passwordCorrect) {
    res.status(401).send({ error: 'invalid username/pass' });
    return;
  }

  const tokenPayload = {
    username,
    _id,
  };

  const token = jwt.sign(tokenPayload, process.env.SECRET);

  res.status(200).json({ name, username, token });
});

module.exports = router;
