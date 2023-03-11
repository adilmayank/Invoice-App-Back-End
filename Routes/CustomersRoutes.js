const express = require('express')
const router = express.Router()
const { CustomersController } = require('../Controllers/index')

// Get all customers
router.get(
  '/api/v1/customer/getAllCustomers',
  CustomersController.getAllCustomers
)

// Get Single customer
router.get(
  '/api/v1/customer/getSingleCustomer/:id',
  CustomersController.getSingleCustomer
)

// Update single customer
router.patch(
  '/api/v1/customer/updateCustomer/',
  CustomersController.updateSingleCustomer
)

// Create a customer
router.post(
  '/api/v1/customer/createCustomer',
  CustomersController.createCustomer
)

module.exports = router
