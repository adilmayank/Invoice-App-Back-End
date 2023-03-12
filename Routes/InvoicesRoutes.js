const express = require('express')
const router = express.Router()
const { InvoicesController } = require('../Controllers/index')
const { InvoiceAggregate } = require('../Middlewares')

// get all invoices
router.get('/api/v1/invoice/getAllInvoices', InvoicesController.getAllInvoices)

// get single invoice
router.get(
  '/api/v1/invoice/getInvoice/:invoiceId',
  InvoicesController.getSingleInvoice,
  InvoiceAggregate
)

// update single invoice
router.patch(
  '/api/v1/invoice/updateInvoice',
  InvoicesController.updateSingleInvoice
)

// convert to quotation
router.patch(
  '/api/v1/invoice/convertToQuotation',
  InvoicesController.convertInvoiceToQuotation
)

// submit invoice
router.patch('/api/v1/invoice/submitInvoice', InvoicesController.submitInvoice)

// remove transaction detail item
router.patch(
  '/api/v1/invoice/removeTransactionDetail',
  InvoicesController.removeTransactionDetail
)

// download invoice
router.get(
  '/api/v1/invoice/downloadInvoice',
  InvoicesController.downloadInvoice
)

// send invoice
router.patch('/api/v1/invoice/sendInvoice', InvoicesController.sendInvoice)

// submit and Send invoice
router.patch(
  '/api/v1/invoice/submitAndSendInvoice',
  InvoicesController.submitAndSendInvoice
)

module.exports = router
