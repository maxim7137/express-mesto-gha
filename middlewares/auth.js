const jwt = require('jsonwebtoken');
const Miss = require('../errors/miss');

module.exports.auth = (req, res, next) => {
  let payload; // объявляем переменную вне блока try catch
  const { authorization } = req.headers; // достаём авторизационный заголовок

  try {
    // убеждаемся, что он есть или начинается с Bearer
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Miss('Необходима авторизация');
    } else {
      const token = authorization.replace('Bearer ', ''); // извлечём токен
      payload = jwt.verify(token, 'dev-key'); // верифицируем токен
    }
  } catch (error) {
    next(error);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
