const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');
const { JWT_SECRET } = require('../utils/constants');

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        ),
      });
    })
    .catch((err) => next(new UnauthenticatedError(err.message)));
};

const createUser = (req, res, next) => {
  const {
    email, password, avatar = undefined, about = undefined, name = undefined,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      avatar,
      about,
      name,
    }))
    .then((user) => {
      const u = user.toObject();
      delete u.password;
      res.status(201).send(u);
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
