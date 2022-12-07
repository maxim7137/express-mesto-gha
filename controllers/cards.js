const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

/* module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
}; */

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('user'); // .populate('user')
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .then((answer) => res.send(answer))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((answer) => res.send(answer))
    .catch((err) => res.status(500).send({ message: err.message }));

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((answer) => res.send(answer))
    .catch((err) => res.status(500).send({ message: err.message }));
