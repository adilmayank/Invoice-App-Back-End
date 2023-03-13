const express = require('express')
const router = express.Router()
const { CustomerController } = require('../Controllers')

const BASE_URL = '/api/v1/customer'

// Get all customers
router.get(`${BASE_URL}/getAllCustomers`, CustomerController.getAllCustomers)

// Get Single customer
router.get(
  `${BASE_URL}/getCustomer/:customerId`,
  CustomerController.getSingleCustomer
)

// Update single customer
router.patch(
  `${BASE_URL}/updateCustomer`,
  CustomerController.updateSingleCustomer
)

// Delete single customer
router.patch(
  `${BASE_URL}/deleteCustomer`,
  CustomerController.deleteSingleCustomer
)

// Create a customer
router.post(
  `${BASE_URL}/createCustomer`,
  CustomerController.createSingleCustomer
)

module.exports = router
