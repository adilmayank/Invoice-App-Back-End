const express = require('express')
const router = express.Router()
const { ProductsController } = require('../Controllers/index')

router.get('/api/v1/getProducts', ProductsController.getAllProducts)
router.get('/api/v1/getProducts/:id', ProductsController.getSingleProduct)
router.patch(
  '/api/v1/updateProduct/:id',
  ProductsController.updateSingleProduct
)
router.post('/api/v1/createProduct', ProductsController.createProduct)

module.exports = router
