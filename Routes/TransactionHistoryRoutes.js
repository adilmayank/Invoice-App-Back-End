const express = require('express')
const router = express.Router()
const { TransactionHistoryController } = require('../Controllers')

// Get all transactions
router.get(
  '/api/v1/transactions/getAllTransactionDetails',
  TransactionHistoryController.getAllTransactionDetails
)

// Get single transaction
router.get(
  '/api/v1/transactions/getSingleTransactionDetail/:id',
  TransactionHistoryController.getSingleTransactionDetail
)

// Update Single Transaction
router.patch(
  '/api/v1/transactions/updateTransactionDetail',
  TransactionHistoryController.updateTransactionDetail
)

// Create a transaction detail
router.post('/api/v1/transactions/createTransactionDetail', TransactionHistoryController.addTransactionDetail)

module.exports = router
