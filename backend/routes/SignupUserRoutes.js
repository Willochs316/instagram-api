const express = require('express');
const router = express.Router();
const {
  getSignup,
  setSignup,
  updateSignup,
  deleteSignup,
} = require('../Controller/SignupController');

router.get('/', getSignup);

router.post('/', setSignup);

router.put('/:id', updateSignup);

router.delete('/:id', deleteSignup);

module.exports = router;
