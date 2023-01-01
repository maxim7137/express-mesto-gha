const mongoose = require('mongoose');

const userValidator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, '-Пользователь с таким адресом уже зарегистрирован.'],
    required: [true, '-Почта обязательна.'],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return userValidator.isEmail(v); // если нет, вернётся false
      },
      message: '-Ведите почту, например: example@mail.com', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  password: {
    type: String,
    required: [true, '-Пароль обязателен.'],
    select: false,
    minlength: [8, `-Минимальная длина пароля 8 символов`],
  },
  name: {
    type: String,
    required: false,
    default: 'Жак-Ив Кусто',
    minlength: [2, `-Ведите имя от 2 до 30 символов, введено {VALUE}.`],
    maxlength: [30, `-Ведите имя от 2 до 30 символов, введено {VALUE}.`],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, `-О себе от 2 до 30 символов, введено {VALUE}.`],
    maxlength: [30, `-О себе от 2 до 30 символов, введено {VALUE}.`],
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return userValidator.isURL(v); // если нет, вернётся false
      },
      message:
        '-Ведите правильный URL для ссылки на аватар, например: https://example.com/picture.jpg', // когда validator вернёт false, будет использовано это сообщение
    },
  },
});

module.exports = mongoose.model('user', userSchema);
