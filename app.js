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

const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3001, DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

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

app.use(router);

// здесь обрабатываем все ошибки
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // свой обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});
