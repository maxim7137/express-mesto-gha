const express = require('express');
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

router.use(express.json()); // мидлвэр для body

router.patch('/me', updateUser);
router.post('/', createUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
