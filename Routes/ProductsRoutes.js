const express = require('express')
const router = express.Router()
const { ProductsController } = require('../Controllers/index')

router.get('/api/v1/product/getAllProducts', ProductsController.getAllProducts)
router.get(
  '/api/v1/product/getSingleProduct/:id',
  ProductsController.getSingleProduct
)
router.patch(
  '/api/v1/product/updateProduct',
  ProductsController.updateSingleProduct
)
router.post('/api/v1/product/createProduct', ProductsController.createProduct)

module.exports = router
