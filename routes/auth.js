const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const { validateRegAndLoginUser } = require('../middlewares/validations');

router.post('/signup', validateRegAndLoginUser, createUser);
router.post('/signin', validateRegAndLoginUser, login);

module.exports = router;
