const express = require('express')
const router = express.Router()
const { CustomersController } = require('../Controllers/index')

router.get(
  '/api/v1/customer/getAllCustomers',
  CustomersController.getAllCustomers
)
router.get(
  '/api/v1/customer/getSingleCustomer/:id',
  CustomersController.getSingleCustomer
)
router.patch(
  '/api/v1/customer/updateCustomer/',
  CustomersController.updateSingleCustomer
)
router.post(
  '/api/v1/customer/createCustomer',
  CustomersController.createCustomer
)

module.exports = router
