const express = require('express');
const passport = require('../config/passportConfig');
const router = express.Router();
const db = require('../models');

// GET /auth/signup - sends the signup form
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// POST /auth/signup - try to add a new user to db
//* receives the data from that from above
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {  //* data to create if not find 
      name: req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]) {
    if (created) {
      console.log('user was created.');
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in.'
      })(req, res);  //? IIFE immediately invoke function expression.
    } else {
      req.flash('error', 'Email already exists!')
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {  //? to catch error
    req.flash('error', error.message); 
    res.redirect('/auth/signup');
  });
});


//GET /auth/login - sends the login form
router.get('/login', function(req, res) {
  res.render('auth/login');
});

// POST /auth/login - does the authentication
router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in.',
  failureFlash: 'Invalide username and/or password.'
}));

// GET /auth/logout - deletes the session
router.get('/logout', function(req, res) {
  req.logout(); //* passport function to delete session.
  console.log('log out');
  req.flash('success', 'You have a logged out.')
  res.redirect('/');
})



module.exports = router;
