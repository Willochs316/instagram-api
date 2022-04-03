const express = require('express');
const {
  createUser,
  updateUser,
  getUsers,
} = require('../Controller/users.controller');
const router = express.Router();

router.post('/', createUser);
router.post('/login', updateUser);
router.get('/users', getUsers);

module.exports = router;
