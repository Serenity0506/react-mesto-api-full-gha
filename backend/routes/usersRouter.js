const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersControllers = require('../controllers/usersController');
const { validateUrl } = require('../utils/validators');

router.get('/users', usersControllers.getUsers);

router.get('/users/me', usersControllers.getUserByIdAuth);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), usersControllers.updateUser);

router.get('/users/:userId', celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24),
  }),
}), usersControllers.getUserByIdRouteParam);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (!validateUrl(value)) return helpers.message('Field should be a valid url');

      return value;
    }),
  }),
}), usersControllers.updateAvatar);

module.exports = router;
