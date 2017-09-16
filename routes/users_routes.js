const express = require('express')
const router = express.Router()
const users = require('../controllers/users_controller')
const passport =
require('../config/passport')

// Register ======================

router.get('/register', function (req, res) {
  res.render('register')
})

router.post('/register', users.register)

// Login =========================

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login',
passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
  function (req, res) {
    res.redirect('/')
  })

// Logout =======================

router.get('/logout', function (req, res) {
  req.logout()

  req.flash('successMessage', 'Logged out')
  res.redirect('/users/login')
})

module.exports = router
