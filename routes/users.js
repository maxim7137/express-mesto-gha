const router = require('express').Router();
const {
  validateUserId,
  validateUpdateUser,
  validateAvatar,
} = require('../middlewares/validations');

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
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

router.use('/*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

module.exports = router;
