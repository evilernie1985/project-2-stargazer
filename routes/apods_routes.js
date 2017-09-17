const express = require('express')
const router = express.Router()
const apodsController = require('../controllers/apods_controller')

// Apods Index ==================

router.get('/apods', apodsController.index)

// Apod Create =================

router.post('/apods', apodsController.create)

// Apod Show ===================

router.get('/apods/:id', apodsController.show)


// Apod Update ==================



// Apod Destroy =================




module.exports = router
