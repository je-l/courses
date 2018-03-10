const errorMiddleware = (error, req, res, next) => {  // eslint-disable-line
  console.error(error);
  res.status(500).end();
};

module.exports = errorMiddleware;
