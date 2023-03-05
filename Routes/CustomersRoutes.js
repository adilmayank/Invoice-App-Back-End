const express = require('express')
const router = express.Router()
const { CustomersController } = require('../Controllers/index')

router.get('/api/v1/getCustomers', CustomersController.getAllCustomers)
router.get('/api/v1/getCustomer/:id', CustomersController.getSingleCustomer)
router.patch(
  '/api/v1/updateCustomer/',
  CustomersController.updateSingleCustomer
)
router.post('/api/v1/createCustomer', CustomersController.createCustomer)

module.exports = router
