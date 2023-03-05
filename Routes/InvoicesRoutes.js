const express = require('express')
const router = express.Router()
const { InvoicesController } = require('../Controllers/index')

router.get('/api/v1/getInvoices', InvoicesController.getAllInvoices)
router.get('/api/v1/getInvoices/:id', InvoicesController.getSingleInvoice)
router.patch(
  '/api/v1/updateInvoice/:id',
  InvoicesController.updateSingleInvoice
)
router.post('/api/v1/createInvoice', InvoicesController.createInvoice)
router.get('/api/v1/convertToEstimate', InvoicesController.convertInvoiceToEstimate)

module.exports = router
