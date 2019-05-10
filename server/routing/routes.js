const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12; // Salt rounds for hashing the password
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
// Validation for the Login and Register Routes
const registerValidation = require('../validation/register');
const loginValidation = require('../validation/login');

// Helper Date file for user
const registerDate = require('../helpers/DateStamp');

// Importing the Mongoose model to be able to modify database || CRUD
const User = require('../models/User');

// @route   POST
// @desc    Register a new user
// @access  Public
// URL: http://localhost:5000/api/register
router.post('/register', (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  // Check for errors through validation file before continuing
  if (!isValid) {
    return res.status(400).json(errors); // The errors return will be the ones we made in our helper file. This is our custom error handling.
  }

  const { name, email } = req.body;

  // Start off by checking the database to make sure that a user is not already registered with that email
  User.findOne({ email }).then(user => {
    // If the email provided is already registered, it will return a status of 400 and a custom error message
    if (user) {
      return res.status(400).json({
        email: 'That email is already registered with us, please try again!'
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Hashed password is now ready to be set for the object that will be saved into the database
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          registeredAt: registerDate
        });
        // Now we save the user into the database. Send back a success message if everything goes okay. Return a error if not.
        newUser.save().then(() => {
          res.json({
            success: true,
            message: `Welcome ${req.body.name}`
          });
        });
      });
    }
  });
});

// @route   GET
// @desc    Login a existing user
// @access  Public
// URL: http://localhost:5000/api/login
router.post('/login', (req, res) => {
  const { errors, isValid } = loginValidation(req.body);

  // Check for errors through validation file before continuing
  if (!isValid) {
    return res.status(400).json(errors); // The errors return will be the ones we made in our helper file. This is our custom error handling.
  }

  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // The user has successfully been found and the password is correct.
        // set a Payload that will return any user info that we want to save in the JSONwebToken
        const payload = {
          id: user.id,
          email: user.email
        };

        // Sign the token and ship it
        jwt.sign(
          payload, // Data to send
          keys.secretOrKey, // required for security purposes,
          { expiresIn: 3600 }, // 1 hour expiration. 3600 seconds === 1 hour
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token // ** note the space after 'Bearer ' to make it easier to extract the token
            });
          }
        );
      } else {
        res.status(400).json({ password: 'Credentials are invalid' });
      }
    });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ name: req.user.name, id: req.user.id });
  }
);

module.exports = router;
