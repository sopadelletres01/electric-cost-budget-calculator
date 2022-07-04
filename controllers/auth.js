var validator = require('validator');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
exports.signup = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).render('auth/signup', {
            errorMessage: 'Please provide your username.',
        });
    }

    if (password.length < 8) {
        return res.status(400).render('auth/signup', {
            errorMessage:
                'Your password needs to be at least 8 characters long.',
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
    User.findOne({ username }).then((found) => {
        // If the user is found, send the message username is taken
        if (found) {
            return res.status(400).render('auth/signup', {
                errorMessage: 'Username already taken.',
            });
        }

        // if user is not found, create a new user - start with hashing the password
        return bcrypt
            .genSalt(saltRounds)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                // Create a user and save it in the database
                return User.create({
                    username,
                    password: hashedPassword,
                });
            })
            .then((user) => {
                // Bind the user to the session object
                req.session.user = user;
                res.redirect('/');
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    return res
                        .status(400)
                        .render('auth/signup', { errorMessage: error.message });
                }
                if (error.code === 11000) {
                    return res.status(400).render('auth/signup', {
                        errorMessage:
                            'Username need to be unique. The username you chose is already in use.',
                    });
                }
                return res
                    .status(500)
                    .render('auth/signup', { errorMessage: error.message });
            });
    });
};
