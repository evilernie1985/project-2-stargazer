const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function (username, callback) {
  var query = {username: username}
  User.findOne(query, callback)
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback)
}

module.exports.comparePassword = function (validPassword, hash, callback) {
  bcrypt.compare(validPassword, hash, function (err, isMatch) {
    if (err) throw err
    callback(null, isMatch)
  })
}
