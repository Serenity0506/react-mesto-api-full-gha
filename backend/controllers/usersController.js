const { NotFoundError } = require('../errors/http/NotFoundError');
const { BadRequestError } = require('../errors/http/BadRequestError');
const User = require('../models/userModel');
const { validateUrl } = require('../utils/validators');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next, userId) => {
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const getUserByIdRouteParam = (req, res, next) => getUserById(req, res, next, req.params.userId);
const getUserByIdAuth = (req, res, next) => getUserById(req, res, next, req.user._id);

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  if (!name || !about) {
    throw new BadRequestError();
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!validateUrl(avatar)) { throw new BadRequestError('У вас ссылка битая!'); }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserByIdRouteParam,
  getUserByIdAuth,
  updateUser,
  updateAvatar,
};
