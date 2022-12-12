/* eslint-disable max-len */
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes');

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter); // мидлвер для ограничения кол-во запросов. Для защиты от DoS-атак.
app.use(helmet()); // мидлвер для для простановки security-заголовков, защ. от нек. уязвим.
app.use(express.json()); // мидлвер для body

// <-- временный мидлвер
app.use((req, res, next) => {
  req.user = { _id: '6396cfdb42e5855ac4d722e5' };

  next();
});
// временный мидлвер -->

app.use(router);

// здесь обрабатываем все ошибки
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message, name } = err;
  if (name === 'CastError') {
    res.status(400).send({
      message: 'Неправильный запрос, возможно некорректный идентификатор',
    });
  } else if (name === 'ValidationError') {
    res.status(400).send({
      message: err.message.split('-')[1]
        ? err.message.split('-')[1]
        : err.message,
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});

/* (err) => {
  if (err.message === 'NotFound') {
    res
      .status(404)
      .send({ message: 'Пользователь по указанному _id не найден' });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Некорректный идентификатор' });
  } else {
    res.status(500).send({ message: err.message });
  }
} */
