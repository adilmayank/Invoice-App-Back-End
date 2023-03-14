const express = require('express')
const router = express.Router()
const { TransactionDetailController } = require('../Controllers')

const BASE_URL = "/api/v1/transactionDetail"

// Get all transactions
router.get(
  `${BASE_URL}/getAllTransactionDetails`,
  TransactionDetailController.getAllTransactionDetails
)

// Get single transaction
router.get(
  `${BASE_URL}/getTransactionDetail/:transactionId`,
  TransactionDetailController.getSingleTransactionDetail
)

// Update Single Transaction
router.patch(
  `${BASE_URL}/updateTransactionDetail`,
  TransactionDetailController.updateTransactionDetail
)

// Create a transaction detail
router.post(
  `${BASE_URL}/createTransactionDetail`,
  TransactionDetailController.addTransactionDetail
)

// Delete a transaction detail
router.delete(
  `${BASE_URL}/deleteTransactionDetail`,
  TransactionDetailController.deleteTransactionDetail
)

module.exports = router
