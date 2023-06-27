const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthenticatedError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new UnauthenticatedError();
  }

  req.user = payload;
  next();
};

module.exports = { checkToken };
