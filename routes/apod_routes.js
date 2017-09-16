const express = require('express')
const router = express.Router()
const apodController = require('../controllers/apod_controller')

// Save new APOD to current user

router.post('/', apodController.create)

module.exports = router
