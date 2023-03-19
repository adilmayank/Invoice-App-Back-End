const express = require('express')
const router = express.Router()
const { QuotationController } = require('../Controllers')
const { QuotationAggregate } = require('../Middlewares')

const BASE_URL = '/api/v1/quotation'

// Get all quotations
router.get(`${BASE_URL}/getAllQuotations`, QuotationController.getAllQuotations)

// Get single quotation
router.get(
  `${BASE_URL}/getQuotation/:quotationId`,
  QuotationController.getSingleQuotation
)

// Create new Quotation
router.post(`${BASE_URL}/createQuotation`, QuotationController.createQuotation)

// Update single quotation
router.patch(
  `${BASE_URL}/updateQuotation`,
  QuotationController.updateSingleQuotation
)

// Update Quotation Status
router.patch(
  `${BASE_URL}/updateQuotationStatus`,
  QuotationController.updateQuotationStatus
)

// Download Quotation
router.get(
  `${BASE_URL}/downloadQuotation/:quotationId`,
  QuotationController.downloadQuotation
)

// Send Quotation
router.patch(`${BASE_URL}/sendQuotation`, QuotationController.sendQuotation)

// Convert To Invoice
router.patch(
  `${BASE_URL}/convertToInvoice`,
  QuotationController.convertToInvoice
)

// Delete quotation
router.delete(
  `${BASE_URL}/deleteQuotation`,
  QuotationController.deleteQuotation
)

module.exports = router
