const express = require('express')
const router = express.Router()

// Homepage =====================

router.get('/', function (req, res) {
  console.log(req.user)
  console.log(req.isAuthenticated())
  res.render('index')
})

module.exports = router
