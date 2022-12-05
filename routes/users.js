const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');

router.get('/:userId', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me/avatar', updateAvatar);
// router.patch('/me', updateUser);

module.exports = router;
