const { celebrate, Joi } = require('celebrate');
const userValidator = require('validator');
const { isValidObjectId } = require('mongoose');

module.exports.validateRegAndLoginUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (userValidator.isEmail(value)) {
            return value;
          }
          return helpers.message(
            'Ведите почту, например: example@mail.com, Joi-custom'
          );
        })
        .messages({
          'any.required': 'Почта обязательна, Joi',
          'string.custom':
            'Ведите почту, например: example@mail.com, Joi-messages',
        }),
      password: Joi.string().required().min(8).messages({
        'any.required': 'Пароль обязателен, Joi',
        'string.min': 'Минимальная длина пароля 8 символов, Joi',
      }),
      name: Joi.string().min(2).max(30).messages({
        'string.min': 'Имя от 2 до 30 символов, Joi',
        'string.max': 'Имя от 2 до 30 символов, Joi',
      }),
      about: Joi.string().min(2).max(30).messages({
        'string.min': 'О себе от 2 до 30 символов, Joi',
        'string.max': 'О себе от 2 до 30 символов, Joi',
      }),
      avatar: Joi.string().custom((value, helpers) => {
        if (userValidator.isURL(value)) {
          return value;
        }
        return helpers.message(
          'Ведите URL для ссылки на аватар, например: https://example.com/picture.jpg, Joi'
        );
      }),
    })
    .unknown(),
});

module.exports.validateNewCard = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (userValidator.isEmail(value)) {
            return value;
          }
          return helpers.message(
            'Ведите почту, например: example@mail.com, Joi-custom'
          );
        })
        .messages({
          'any.required': 'Почта обязательна, Joi',
          'string.custom':
            'Ведите почту, например: example@mail.com, Joi-messages',
        }),
      password: Joi.string().required().min(8).messages({
        'any.required': 'Пароль обязателен, Joi',
        'string.min': 'Минимальная длина пароля 8 символов, Joi',
      }),
      name: Joi.string().min(2).max(30).messages({
        'string.min': 'Имя от 2 до 30 символов, Joi',
        'string.max': 'Имя от 2 до 30 символов, Joi',
      }),
      about: Joi.string().min(2).max(30).messages({
        'string.min': 'О себе от 2 до 30 символов, Joi',
        'string.max': 'О себе от 2 до 30 символов, Joi',
      }),
      avatar: Joi.string().custom((value, helpers) => {
        if (userValidator.isURL(value)) {
          return value;
        }
        return helpers.message(
          'Ведите URL для ссылки на аватар, например: https://example.com/picture.jpg, Joi'
        );
      }),
    })
    .unknown(),
});

module.exports.validateAuth = celebrate(
  {
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required().messages({
          'any.required': 'Необходима авторизация, Joi',
        }),
      })
      .unknown(),
  },
  { statusCode: 401 }
);

module.exports.validateCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isValidObjectId(value)) {
            return value;
          }
          return helpers.message('Id не из этой базы данных, Joi-custom');
        })
        .messages({
          'any.required': 'Необходимо указать id карточки, Joi',
        }),
    })
    .unknown(),
});

module.exports.validateCardCreate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).messages({
        'string.min': 'Название от 2 до 30 символов, Joi',
        'string.max': 'Название от 2 до 30 символов, Joi',
        'any.required': 'Название карточки обязательно, Joi',
      }),

      link: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (userValidator.isURL(value)) {
            return value;
          }
          return helpers.message(
            'Ведите ссылку на картинку, например: https://example.com/image.jpg, Joi-helpers'
          );
        })
        .messages({
          'any.required': 'Ссылка на картинку обязательна, Joi',
          'string.custom':
            'Ведите ссылку на картинку, например: https://example.com/image.jpg, Joi-messages',
        }),
    })
    .unknown(),
});