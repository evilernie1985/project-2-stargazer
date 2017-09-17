const express = require('express')
const router = express.Router()
const apodsController = require('../controllers/apods_controller')

// Apods Index ==================

router.get('/apods', apodsController.index)

// Apod Create =================

router.post('/apods', apodsController.create)

// Apod Show ===================

router.get('/apods/:id', apodsController.show)

// Apod Edit ======================

router.get('/apods/:id/edit', apodsController.edit)

// Apod Update ==================

router.patch('/apods/:id', apodsController.update)

// Apod Destroy =================

router.delete('/apods/:id', apodsController.destroy)

module.exports = router
