const router = require('express').Router();

// ℹ️ Handles password encryption
const mongoose = require('mongoose');

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');
const { signup, login, logout } = require('../controllers/auth');

router.get('/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isLoggedOut, signup);

router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login');
});

router.post('/login', isLoggedOut, login);

router.get('/logout', isLoggedIn, logout);

module.exports = router;
