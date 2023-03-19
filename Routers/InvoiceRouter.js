const express = require('express')
const router = express.Router()
const { InvoiceController } = require('../Controllers')

// get all invoices
router.get('/api/v1/invoice/getAllInvoices', InvoiceController.getAllInvoices)

// get single invoice
router.get(
  '/api/v1/invoice/getInvoice/:invoiceId',
  InvoiceController.getSingleInvoice
)

// update single invoice
router.patch(
  '/api/v1/invoice/updateInvoice',
  InvoiceController.updateSingleInvoice
)

// convert to quotation
router.patch(
  '/api/v1/invoice/convertToQuotation',
  InvoiceController.convertInvoiceToQuotation
)

// submit invoice
router.patch('/api/v1/invoice/submitInvoice', InvoiceController.submitInvoice)

// download invoice
router.get('/api/v1/invoice/downloadInvoice', InvoiceController.downloadInvoice)

// send invoice
router.patch('/api/v1/invoice/sendInvoice', InvoiceController.sendInvoice)

// submit and Send invoice
router.patch(
  '/api/v1/invoice/submitAndSendInvoice',
  InvoiceController.submitAndSendInvoice
)

module.exports = router
