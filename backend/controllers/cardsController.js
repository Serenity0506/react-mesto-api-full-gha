const card = require('../models/cardModel');
const { UnauthorizedError } = require('../errors/http/UnauthorizedError');
const { NotFoundError } = require('../errors/http/NotFoundError');

const getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((c) => res.status(201).send(c))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((c) => {
      if (!c) {
        throw new NotFoundError('Карточка не найдена');
      } else if (c.owner.toString() !== req.user._id) {
        throw new UnauthorizedError('Не положено удалять чужие карточки');
      } else {
        c.deleteOne().then(() => res.send(c));
      }
    })
    .catch(next);
};

const putLikeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (!c) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(c);
      }
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((c) => {
      if (!c) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(c);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
