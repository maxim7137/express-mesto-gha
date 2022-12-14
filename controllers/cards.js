const Card = require('../models/card');
const NotFoundError = require('../errors/notFound');
const NoAccess = require('../errors/noAccess');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  console.log(cardId);
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
    .catch(next);
};

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new NotFoundError('Карточка с таким _id не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new NotFoundError('Карточка с таким _id не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
