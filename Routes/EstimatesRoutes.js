const express = require('express')
const router = express.Router()
const { EstimatesController } = require('../Controllers/index')

router.get('/api/v1/getEstimates', EstimatesController.getAllEstimates)
router.get('/api/v1/getEstimates/:id', EstimatesController.getSingleEstimate)
router.patch(
  '/api/v1/updateEstimate/:id',
  EstimatesController.updateSingleEstimate
)
router.post('/api/v1/createEstimate', EstimatesController.createEstimate)

module.exports = router
