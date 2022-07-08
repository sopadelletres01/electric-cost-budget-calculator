const router = require('express').Router();
const validator = require('validator');

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
const { signup, login, logout,updatePassword } = require('../controllers/auth');

router.get('/signup',[csrfProteccion, isLoggedOut], (req, res) => {
  res.render('auth/signup',{ csrfToken: req.csrfToken() });
});

router.post('/signup',[csrfProteccion, isLoggedOut], signup);

router.get('/login',[csrfProteccion, isLoggedOut], (req, res) => {
  res.render('auth/login',{ csrfToken: req.csrfToken() });
});

router.post('/login',[csrfProteccion, isLoggedOut], login);

router.get('/logout',[csrfProteccion, isLoggedIn], logout);


router.get('/profile', [csrfProteccion, isLoggedIn],async (req,res)=>{
  try {
    const userId = req.session.user._id
    console.log('usuario IDDDD', userId)
    const infoUser = await User.findById(userId);
    console.log('INFO DEL USUARIO',infoUser)
    res.render('auth/profile', { csrfToken: req.csrfToken(), infoUser })

  } catch (error) { 
    console.log('no funcionaaa y normal estoy dormida',error)
  }
});

router.post('/profile/edit', [csrfProteccion, isLoggedIn], async (req, res) => {
  try {
    const userId = req.session.user._id
    console.log('USUARIO ID',userId)
    const infoUser = await User.findByIdAndUpdate(userId,  req.body , { new: true });
    console.log('USUARIO ID',infoUser)
    res.render('auth/profile', { csrfToken: req.csrfToken(), infoUser })

  } catch (error) {
    console.log('error al actualizar el usuario', error)
  }
})
router.get('/profile/editPassword', [csrfProteccion, isLoggedIn], async (req, res) => {
  try {
    const userId = req.session.user._id
    const infoUser=await User.findById(userId);
    res.render('auth/profilePassword', { csrfToken: req.csrfToken(), infoUser })

  } catch (error) {
    console.log('error al actualizar el usuario', error)
  }
})

router.post('/profile/editPassword', [csrfProteccion, isLoggedIn], updatePassword )
 
 
module.exports = router;
