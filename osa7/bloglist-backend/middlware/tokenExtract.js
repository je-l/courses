const tokenExtract = (req, res, next) => {
  const tokenHeader = req.get('authorization');

  if (tokenHeader) {
    const [, token] = tokenHeader.match(/bearer (.*)$/i);
    req.token = token;
  }

  next();
};

module.exports = tokenExtract;
