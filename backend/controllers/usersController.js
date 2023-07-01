const { NotFoundError } = require('../errors/http/NotFoundError');
const User = require('../models/userModel');

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

const updateUser = (req, res, next, userData) => {
  User.findByIdAndUpdate(
    req.user._id,
    userData,
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

const updateUserNameAndAbout = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, next, { avatar });
};

module.exports = {
  getUsers,
  getUserByIdRouteParam,
  getUserByIdAuth,
  updateUserNameAndAbout,
  updateAvatar,
};
