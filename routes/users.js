const router = require('express').Router();
const { validateUserId } = require('../middlewares/validations');

const {
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
  getUserById,
} = require('../controllers/users');

router.get('/me', getUser);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
