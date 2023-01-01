const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardValidator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, '-Название обязательно.'],
    minlength: [2, `-Ведите название от 2 до 30 символов, введено {VALUE}.`],
    maxlength: [30, `-Ведите название от 2 до 30 символов, введено {VALUE}.`],
  },
  link: {
    type: String,
    required: [true, '-Ссылка на картинку обязательна.'],
    validate: {
      // опишем свойство validate
      validator(v) {
        // validator - функция проверки данных. v - значение свойства age
        return cardValidator.isURL(v); // если нет, вернётся false
      },
      message:
        '-Ведите правильный URL для ссылки на картинку, например: https://example.com', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
