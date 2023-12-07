// routes/auth.js
const express = require('express');
const userRouter = express.Router();

const userModel = require("./User")

const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../user/User'); // Update the path accordingly

userRouter.get('/register', (req, res) => {
  res.render('auth/register');
});

// Assuming this is your route handler for user registration
userRouter.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
  
      await user.save();
  
      // Log in the user after successful registration
      req.login(user, (err) => {
        if (err) {
          console.error('Error logging in user:', err);
          return res.redirect('/login');
        }
  
        // Redirect to the home page with the user's username
        return res.redirect('/');
      });
    } catch (error) {
      // Redirect to the registration page with an error message upon failure
      res.redirect('/register?error=true'); // Update the path as needed
    }
  });

  userRouter.get('/login', (req, res) => {
  res.render('auth/login');
});

userRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

userRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = userRouter;
