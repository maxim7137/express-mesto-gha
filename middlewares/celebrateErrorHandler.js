const { isCelebrateError } = require('celebrate');

exports.errors = (opts = {}) => {
  const finalOpts = { ...opts };
  console.log(finalOpts);
  return (err, req, res, next) => {
    // If this isn't a Celebrate error, send it to the next error handler
    if (!isCelebrateError(err)) {
      return next(err);
    }

    let statusCode;
    let message;

    if (err.details.get('params')) {
      statusCode = 400;
      message = err.details.get('params').details[0].message;
    } else {
      statusCode = err.details.get('headers') ? 401 : 400;
      message = err.details.get('headers')
        ? err.details.get('headers').details[0].message
        : err.details.get('body').details[0].message;
    }

    return res.status(statusCode).send({ message });
  };
};

/*     let statusCode;
      let message;

      if (err.details.get('params')) {
        statusCode = 400;
        message = err.details.get('params').details[0].message;
      } else {
        statusCode = err.details.get('headers') ? 401 : 400;
        message = err.details.get('headers')
          ? err.details.get('headers').details[0].message
          : err.details.get('body').details[0].message;
      }

      return res.status(statusCode).send({ message }); */
