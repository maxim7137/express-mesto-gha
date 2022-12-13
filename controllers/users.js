const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound');
const Miss = require('../errors/miss');
const BadRequest = require('../errors/badRequest');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  try {
    if (password.length < 8) {
      throw new BadRequest('Нет пароля или его длина меньше 8 символов');
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({ email, password: hash, name, about, avatar }))
        .then((user) => res.send(user))
        .catch(next);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send({ name: user.name, about: user.about });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Miss('Неправильные почта или пароль');
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Miss('Неправильные почта или пароль');
          }
          return user;
        })
        .then(() => {
          // создадим токен

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key', {
            expiresIn: '7d',
          });
          // вернём токен
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
