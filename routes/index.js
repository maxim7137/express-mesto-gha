const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateAuth } = require('../middlewares/validations');
const { validateCardId } = require('../middlewares/validations');

router.use('/', require('./auth'));

router.use('/cards', validateAuth, auth, require('./cards'));
router.use('/users', validateAuth, auth, require('./users'));

router.use(validateCardId);

router.use('/*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

module.exports = router;
