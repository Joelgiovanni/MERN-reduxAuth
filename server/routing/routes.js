const express = require('express');
const router = express.Router();

// @route   POST
// @desc    Register a new user
// @access  Public
// URL: http://localhost:5000/api/register
router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Register route works'
  });
});

// @route   GET
// @desc    Login a existing user
// @access  Public
// URL: http://localhost:5000/api/login
router.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login route works'
  });
});

module.exports = router;
