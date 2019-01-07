//route: localhost:5000/auth/google

const express = require('express');
const router = express.Router();
const passport = require('passport');

// no need to state auth coz this route's js file is auth.js
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;
