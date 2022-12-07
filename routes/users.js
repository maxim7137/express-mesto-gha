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
router.patch('/me', updateUser);

router.use(express.json());

router.post('/', createUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
