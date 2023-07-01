const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthenticatedError());
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new UnauthenticatedError());
  }

  req.user = payload;
  return next();
};

module.exports = { checkToken };
