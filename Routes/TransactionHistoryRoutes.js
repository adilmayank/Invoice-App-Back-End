const express = require('express')
const router = express.Router()
const { TransactionHistoryController } = require('../Controllers')

// Get all transactions
router.get(
  '/api/v1/transactionHistoryDetail/getAllTransactionDetails',
  TransactionHistoryController.getAllTransactionDetails
)

// Get single transaction
router.get(
  '/api/v1/transactionHistoryDetail/getTransactionDetail/:transactionId',
  TransactionHistoryController.getSingleTransactionDetail
)

// Update Single Transaction
router.patch(
  '/api/v1/transactionHistoryDetail/updateTransactionDetail',
  TransactionHistoryController.updateTransactionDetail
)

// Create a transaction detail
router.post('/api/v1/transactions/createTransactionDetail', TransactionHistoryController.addTransactionDetail)

module.exports = router
