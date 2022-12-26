const Card = require('../models/card');
const NotFoundError = require('../errors/notFound');
const NoAccess = require('../errors/noAccess');
const BadRequest = require('../errors/badRequest');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => Card.populate(card, 'owner'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с таким _id не найдена'))
    .then((card) => {
      if (!card.owner.equals(userId)) {
        throw new NoAccess('Удалять можно только свои карточки');
      } else {
        card.delete();
        res.send({ message: 'Пост удалён' });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id карточки'));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с таким _id не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id карточки'));
      } else {
        next(error);
      }
    });

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с таким _id не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id карточки'));
      } else {
        next(error);
      }
    });
