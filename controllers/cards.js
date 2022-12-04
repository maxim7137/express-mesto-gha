const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId, likes, createdAt })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId })
    .then((answer) => res.send(answer))
    .catch((err) => res.status(500).send({ message: err.message }));
};
