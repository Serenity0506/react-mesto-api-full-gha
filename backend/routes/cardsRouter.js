const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsControllers = require('../controllers/cardsController');
const { validateUrl } = require('../utils/validators');

router.get('/cards', cardsControllers.getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (!validateUrl(value)) return helpers.message('Field should be a valid url');

      return value;
    }),
  }),
}), cardsControllers.createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), cardsControllers.deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), cardsControllers.putLikeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), cardsControllers.deleteLikeCard);

module.exports = router;
