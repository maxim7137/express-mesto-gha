const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
  getUserById,
} = require('../controllers/users');

router.get('/me', getUser);
router.get('/:userId', getUserById);
router.get('/', getUsers);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
