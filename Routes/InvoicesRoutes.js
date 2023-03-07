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

// Create and return single invoice
router.post('/api/v1/invoice/createInvoice', InvoicesController.createInvoice)

// Convert to estimate
router.post(
  '/api/v1/invoice/convertToEstimate',
  InvoicesController.convertInvoiceToEstimate
)

// Submit invoice
router.post('/api/v1/invoice/submitInvoice', InvoicesController.submitInvoice)

// Download invoice
router.post(
  '/api/v1/invoice/downloadInvoice',
  InvoicesController.downloadInvoice
)

// Send invoice
router.post('/api/v1/invoice/sendInvoice', InvoicesController.sendInvoice)

// Update Payment Status
router.post(
  '/api/v1/invoice/updatePaymentStatus',
  InvoicesController.updatePaymentStatus
)

// Submit and Send invoice
router.post(
  '/api/v1/invoice/submitAndSendInvoice',
  InvoicesController.submitAndSendInvoice
)

module.exports = router
