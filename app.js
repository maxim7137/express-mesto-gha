/* eslint-disable max-len */
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

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
  req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk3N2MxNTc2N2IyOGNjZmIxY2M0NTQiLCJpYXQiOjE2NzA4NzIxMDYsImV4cCI6MTY3MTQ3NjkwNn0.uQCpfQ6UBEdWinbmOQ3c71g5FDMZ5s_pVLuFxfBbOnw';

  next();
});
// временный мидлвер -->

app.use(router);

// здесь обрабатываем все ошибки
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});
