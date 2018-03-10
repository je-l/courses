const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const { token } = req;
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return next();
  }

  if (!token || !decodedToken._id) {
    return next();
  }

  const user = await User.findById(decodedToken._id);
  req.user = user;
  next();
};

module.exports = authenticate;
