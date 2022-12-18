const router = require('express').Router();

const { createUser, login } = require('../controllers/users');

const { validateRegUser, validateLoginUser } = require('../middlewares/validations');

router.post('/signup', validateRegUser, createUser);
router.post('/signin', validateLoginUser, login);

module.exports = router;
