const { celebrate, Joi } = require('celebrate');
const userValidator = require('validator');

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
          'string.required': 'Почта обязательна, Joi',
          'string.custom':
            'Ведите почту, например: example@mail.com, Joi-messages',
        }),
      password: Joi.string().required().min(8).messages({
        'string.required': 'Пароль обязателен, Joi',
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

/*
module.exports.validateSomeData = celebrate({
  params: Joi.object().keys({
    //валидаторы параметров адреса
    // в нашем случае это только id
  }),

  body: Joi.object().keys({
    //валидаторы данных передаваемых в body
  }),

  headers: Joi.object()
    .keys({
      //валидатор заголовка, требуется проверять только
      //наличие заголовка authorization, в запросов которые требуют авторизации
    })
    .unknown(),
});
 */
