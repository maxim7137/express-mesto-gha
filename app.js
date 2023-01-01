/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable max-len */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes'); // импорт роутов
const { errorHandler } = require('./middlewares/errorHandler'); // импорт обработчика ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger'); // импорт логгеров

const { DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

const whiteList = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://maxim.nomoredomains.club',
  'http://maxim.nomoredomains.club',
  'maxim.nomoredomains.club',
  'https://api.maxim.nomoredomains.club',
  'http://api.maxim.nomoredomains.club',
  'api.maxim.nomoredomains.club',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

mongoose.set('strictQuery', false);
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

app.use(requestLogger); // подключаем мидлвер логгер запросов
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок

// здесь обрабатываем все ошибки
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // свой обработчик ошибок

module.exports = { app, DB };
