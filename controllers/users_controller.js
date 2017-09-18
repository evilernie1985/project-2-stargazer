const expressValidator = require('express-validator')
const User = require('../models/User')

function register (req, res) {
  var registerUsername = req.body.registerUsername
  var registerEmail = req.body.registerEmail
  var registerPassword = req.body.registerPassword
  var confirmPassword = req.body.confirmPassword

  // Validations

  req.checkBody('registerUsername', 'Username is required').notEmpty()
  req.checkBody('registerEmail', 'Email address is required').notEmpty()
  req.checkBody('registerEmail', 'Email is not valid').isEmail()
  req.checkBody('registerPassword', 'Password is required').notEmpty()
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.registerPassword)

  var errors = req.validationErrors()
  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    var newUser = new User({
      username: req.body.registerUsername,
      email: req.body.registerEmail,
      password: req.body.registerPassword
    })

    User.createUser(newUser, function (err, user) {
      if (err) throw err
    })

    req.flash('successMessage', 'Success! Please sign in.')

    res.redirect('/users/login')
  }
}

module.exports = {
  register
}
