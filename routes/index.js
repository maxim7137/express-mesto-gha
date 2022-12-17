const router = require('express').Router();
const { auth } = require('../middlewares/auth');
// const { validateAuth } = require('../middlewares/validations');

router.use('/', require('./auth'));

router.use('/cards', auth, require('./cards'));
router.use('/users', auth, require('./users'));

router.use('/*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

module.exports = router;
