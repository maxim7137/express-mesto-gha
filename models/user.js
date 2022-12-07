const mongoose = require('mongoose');

const npmValidator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно'],
    minlength: [2, `Ведите имя от 2 до 30 символов, введено {VALUE}`],
    maxlength: [30, `Ведите имя от 2 до 30 символов, введено {VALUE}`],
  },
  about: {
    type: String,
    required: [true, 'Заполните пожалуйста о себе'],
    minlength: [2, `О себе от 2 до 30 символов, введено {VALUE}`],
    maxlength: [30, `О себе от 2 до 30 символов, введено {VALUE}`],
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на аватар обязательна'],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return npmValidator.isURL(v); // если нет, вернётся false
      },
      message: 'Ведите URL', // когда validator вернёт false, будет использовано это сообщение
    },
  },
});

module.exports = mongoose.model('user', userSchema);
