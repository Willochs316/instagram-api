const express = require('express');
const {
  createUser,
  updateUser,
  getUsers,
} = require('../Controller/users.controller');
const { protectUsers } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/', createUser);
router.post('/login', updateUser);
router.get('/users', protectUsers, getUsers);

module.exports = router;
