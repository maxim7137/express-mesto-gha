/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound');
const Miss = require('../errors/miss');
const Conflict = require('../errors/conflict');
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
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id пользователя'));
      } else {
        next(error);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id пользователя'));
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) =>
      res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        __v: user.__v,
      }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      } else if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
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
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id пользователя'));
      } else if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
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
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id пользователя'));
      } else if (error.name === 'ValidationError') {
        next(new BadRequest(`${error.message.split('-')[1]}`));
      } else {
        next(error);
      }
    });
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
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
            { expiresIn: '7d' }
          );
          // вернём токен
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
