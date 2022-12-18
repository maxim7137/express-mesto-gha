const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound');

router.use('/', require('./auth'));

router.use('/cards', auth, require('./cards'));
router.use('/users', auth, require('./users'));

router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

module.exports = router;
