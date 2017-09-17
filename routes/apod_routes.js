const express = require('express')
const router = express.Router()
const apodsController = require('../controllers/apods_controller')

// Apod Index route

// router.get('/apods', function (req, res) {
//   res.render('./apods/index')
// })

// Save new APOD to current user

router.post('/', apodsController.create)

// Apod Show route

// Apod Delete route

module.exports = router
