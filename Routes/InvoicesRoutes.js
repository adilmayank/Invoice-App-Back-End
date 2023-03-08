const express = require('express')
const router = express.Router()
const { InvoicesController } = require('../Controllers/index')

// get all invoices
router.get('/api/v1/invoice/getAllInvoices', InvoicesController.getAllInvoices)

// get single invoice
router.get(
  '/api/v1/invoice/getSingleInvoice/:id',
  InvoicesController.getSingleInvoice
)

// update single invoice
router.patch(
  '/api/v1/invoice/updateInvoice',
  InvoicesController.updateSingleInvoice
)

// Convert to estimate
router.get(
  '/api/v1/invoice/convertToEstimate',
  InvoicesController.convertInvoiceToEstimate
)

// Submit invoice
router.get('/api/v1/invoice/submitInvoice', InvoicesController.submitInvoice)

// Download invoice
router.get(
  '/api/v1/invoice/downloadInvoice',
  InvoicesController.downloadInvoice
)

// Send invoice
router.get('/api/v1/invoice/sendInvoice', InvoicesController.sendInvoice)

// Payment status will be updated as a result of 
// Update Payment Status
router.get(
  '/api/v1/invoice/updatePaymentStatus',
  InvoicesController.updatePaymentStatus
)

// Submit and Send invoice
router.get(
  '/api/v1/invoice/submitAndSendInvoice',
  InvoicesController.submitAndSendInvoice
)

// Add payments records
// Implmentation left



module.exports = router
