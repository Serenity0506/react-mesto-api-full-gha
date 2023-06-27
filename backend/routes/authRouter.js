const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authControllers = require('../controllers/authController');
const { validateUrl } = require('../utils/validators');

// router.post('/signin', authControllers.login);
// router.post('/signup', authControllers.createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), authControllers.login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    avatar: Joi.string().custom((value, helpers) => {
      if (!validateUrl(value)) return helpers.message('Field should be a valid url');

      return value;
    }),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), authControllers.createUser);

module.exports = router;
