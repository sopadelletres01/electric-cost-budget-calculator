const validator = require('validator');
const valiPass=require('password-validator')
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;
exports.signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!validator.isEmail(email)) { 
    return res.status(400).render('auth/signup', {
      csrfToken: req.csrfToken(),
      errorMessage: 'Please provide your email.',
    });
  }
  if (validator.isEmpty(username)) {
    return res.status(400).render('auth/signup', {
      csrfToken: req.csrfToken(),
      errorMessage: 'Please provide your username.',
    });
  }
  // validator
  if (!validator.isStrongPassword(password)) {
    console.log('validador')
    
    return res.status(400).render('auth/signup', {
      csrfToken: req.csrfToken(),
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    
    if (!regex.test(password)) {
        return res.status(400).render("signup", {
        errorMessage:
            "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
        });
    }
    */

  // Search the database for a user with the username submitted in the form
  User.findOne({ email }).then(found => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).render('auth/signup', {
        csrfToken: req.csrfToken(),
        errorMessage: 'Username already taken.',
      });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        // Create a user and save it in the database
        return User.create({
          email,
          username,
          password: hashedPassword,
        });
      })
      .then(user => {
        // Bind the user to the session object
        req.session.user = user;
        res.redirect('/');
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).render('auth/signup', { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render('auth/signup', {
            errorMessage: 'Username need to be unique. The username you chose is already in use.',
          });
        }
        return res.status(500).render('auth/signup', { errorMessage: error.message });
      });
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).render('auth/login', {
      errorMessage: 'Please provide your username.',
    });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (!validator.isStrongPassword(password)) {
    return res.status(400).render('auth/login', {
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({ email })
    .then(user => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).render('auth/login', {
          errorMessage: 'Wrong credentials.',
        });
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then(isSamePassword => {
        if (!isSamePassword) {
          return res.status(400).render('auth/login', {
            errorMessage: 'Wrong credentials.',
          });
        }
        req.session.user = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect('/');
      });
    })

    .catch(err => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
};

exports.logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).render('auth/logout', { errorMessage: err.message });
    }
    res.redirect('/');
  });
};
exports.updatePassword = async (req, res) => { 
  try {
    const userId = req.session.user._id
    const infoUser= await User.findById(userId)
    const { repPass, pass, newPass } = req.body
    const hashPass= bcrypt.hashSync(pass,saltRounds)
    if (bcrypt.compareSync(pass, infoUser.password)) {
      if (!validator.equals(repPass, newPass) && !validator.isStrongPassword(repPass)) {
        return res.status(404).render('auth/profilePassword', { csrfToken: req.csrfToken(), errorMessage: 'las contraseñas no coinciden' })
      } else {
        const password = await bcrypt.hash(repPass, saltRounds)
        await User.findByIdAndUpdate(userId, { password: password })
        if (res.status(200)) { 
          req.session.destroy(err => {
            if (err) {
              return res.status(500).render('auth/logout', { errorMessage: err.message });
            }
            res.redirect('/');
          });
        }
      }
    }
  } catch (error) { 
    console.log('error', error)
  }
}

