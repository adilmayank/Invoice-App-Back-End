const express = require('express')
const router = express.Router()
const { ProductsController } = require('../Controllers/index')

// Get all products
router.get('/api/v1/product/getAllProducts', ProductsController.getAllProducts)

// Get single product
router.get(
  '/api/v1/product/getProduct/:productId',
  ProductsController.getSingleProduct
)

// Update Single Route
router.patch(
  '/api/v1/product/updateProduct',
  ProductsController.updateSingleProduct
)

// Delete Single Route
router.patch(
  '/api/v1/product/deleteProduct',
  ProductsController.deleteSingleProduct
)

// Create a product
router.post('/api/v1/product/createProduct', ProductsController.createProduct)

module.exports = router
