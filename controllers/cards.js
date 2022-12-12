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
  const userId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким _id не найдена');
      } else if (!card.owner.equals(userId)) {
        throw new NoAccess('Удалять можно только свои карточки');
      } else {
        card.delete();
        res.send({ message: 'Пост удалён' });
      }
    })
    .catch(next);

  /*   Card.deleteOne({ _id: cardId })
    .then((answer) => {
      if (answer.deletedCount === 0) {
        throw new NotFoundError('Карточка с таким _id не найдена');
      } else {
        res.send({ message: 'Пост удалён' });
      }
    })
res.send(card.owner)
    */
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный идентификатор' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new Error('NotFound'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Передан несуществующий _id карточки' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный идентификатор' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
