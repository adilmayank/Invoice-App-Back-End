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

// convert to estimate
router.patch(
  '/api/v1/invoice/convertToQuotation',
  InvoicesController.convertInvoiceToQuotation
)

// submit invoice
router.patch('/api/v1/invoice/submitInvoice', InvoicesController.submitInvoice)

// download invoice
router.get(
  '/api/v1/invoice/downloadInvoice',
  InvoicesController.downloadInvoice
)

// send invoice
router.patch('/api/v1/invoice/sendInvoice', InvoicesController.sendInvoice)

// Add payment detail
router.patch(
  '/api/v1/invoice/addPaymentDetail',
  InvoicesController.addPaymentDetails
)

// Remove payment detail
router.patch(
  '/api/v1/invoice/removePaymentDetail',
  InvoicesController.removePaymentDetails
)

// submit and Send invoice
router.patch(
  '/api/v1/invoice/submitAndSendInvoice',
  InvoicesController.submitAndSendInvoice
)

module.exports = router
