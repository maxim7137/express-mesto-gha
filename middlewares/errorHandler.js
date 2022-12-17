module.exports.errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message, name, code } = err;
  if (err && message === 'Validation failed') {
    res.send({
      message: err.validation.body.message || message,
    });
  } else if (name === 'CastError') {
    res.status(400).send({
      message: 'Неправильный запрос, возможно некорректный идентификатор',
    });
  } else if (name === 'ValidationError') {
    res.status(400).send({
      message: err.message.split('-')[1]
        ? err.message.split('-')[1]
        : err.message,
    });
  } else if (code === 11000) {
    res.status(409).send({
      message: 'Пользователь с таким email уже существует',
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  }
  next();
};
