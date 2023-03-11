const express = require('express')
const router = express.Router()
const { ProductsController } = require('../Controllers/index')

// Get all products
router.get('/api/v1/product/getAllProducts', ProductsController.getAllProducts)

// Get single product
router.get(
  '/api/v1/product/getSingleProduct/:id',
  ProductsController.getSingleProduct
)

// Update Single Route
router.patch(
  '/api/v1/product/updateProduct',
  ProductsController.updateSingleProduct
)

// Create a product
router.post('/api/v1/product/createProduct', ProductsController.createProduct)

module.exports = router
