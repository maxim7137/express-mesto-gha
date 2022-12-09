const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный идентификатор' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message.split('-')[1] });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message.split('-')[1] });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный идентификатор' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message.split('-')[1] });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный идентификатор' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
