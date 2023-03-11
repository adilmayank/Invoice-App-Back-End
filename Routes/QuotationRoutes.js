const express = require('express')
const router = express.Router()
const { QuotationsController } = require('../Controllers/index')
const { QuotationAggregate } = require('../Middlewares')

// Get all quotations
router.get(
  '/api/v1/quotation/getAllQuotations',
  QuotationsController.getAllQuotations
)

// Get single quotation
router.get(
  '/api/v1/quotation/getSingleQuotation/:quotationId',
  QuotationsController.getSingleQuotation,
  QuotationAggregate
)

// Create new Quotation
router.post(
  '/api/v1/quotation/createQuotation',
  QuotationsController.createQuotation,
)

// Update single quotation
router.patch(
  '/api/v1/quotation/updateSingleQuotation',
  QuotationsController.updateSingleQuotation
)

// Update Quotation Status
router.patch(
  '/api/v1/quotation/updateQuotationStatus',
  QuotationsController.updateQuotationStatus
)

// Download Quotation
router.get(
  '/api/v1/quotation/downloadQuotation/:quotationId',
  QuotationsController.downloadQuotation
)

// Convert To Invoice
router.patch(
  '/api/v1/quotation/convertToInvoice',
  QuotationsController.convertToInvoice
)

module.exports = router
