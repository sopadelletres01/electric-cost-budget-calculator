const router = require('express').Router();
const csrf = require('csurf');

const csrfProteccion = csrf({cookie:true})
console.log(csrfProteccion)

// ℹ️ Handles password encryption
const mongoose = require('mongoose');

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');
const { signup, login, logout } = require('../controllers/auth');

router.get('/signup',[csrfProteccion, isLoggedOut], (req, res) => {
  res.render('auth/signup');
});

router.post('/signup',[csrfProteccion, isLoggedOut], signup);

router.get('/login',[csrfProteccion, isLoggedOut], (req, res) => {
  res.render('auth/login',{ csrfToken: req.csrfToken() });
});

router.post('/login',[csrfProteccion, isLoggedOut], login);

router.get('/logout',[csrfProteccion, isLoggedIn], logout);

module.exports = router;
