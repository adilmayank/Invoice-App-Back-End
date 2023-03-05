const express = require('express')
const router = express.Router()
const { AccountUserController } = require('../Controllers/index')

router.patch("/api/v1/updateUser", AccountUserController.updateUser)

module.exports = router
