const { isCelebrateError } = require('celebrate');

exports.errors = (err, req, res, next) => {
  // If this isn't a Celebrate error, send it to the next error handler
  if (!isCelebrateError(err)) {
    next(err);
  }

  const statusCode = err.details.get('headers') ? 401 : 400;
  const { message } = err.details.get('headers')
    ? err.details.get('headers').details[0]
    : err.details.get('body').details[0];

  return res.status(statusCode).send({ message });
};
