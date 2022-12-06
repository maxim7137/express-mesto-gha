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
router.post('/', router.use(express.json()), createUser);
router.patch('/me/avatar', router.use(express.json()), updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
