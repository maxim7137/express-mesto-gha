// импорт модулей
const winston = require('winston');
const expressWinston = require('express-winston');

// логгер запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

// экспорт логгеров
module.exports = { requestLogger, errorLogger };
