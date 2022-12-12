const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');

router.get('/:userId', getUser);
router.get('/', getUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
