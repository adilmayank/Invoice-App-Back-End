const express = require('express')
const router = express.Router()
const { ProductController } = require('../Controllers')

const BASE_URL = '/api/v1/product'

// Get all products
router.get(`${BASE_URL}/getAllProducts`, ProductController.getAllProducts)

// Get single product
router.get(
  `${BASE_URL}/getProduct/:productId`,
  ProductController.getSingleProduct
)

// Update Single Route
router.patch(`${BASE_URL}/updateProduct`, ProductController.updateSingleProduct)

// Delete Single Route
router.patch(`${BASE_URL}/deleteProduct`, ProductController.deleteSingleProduct)

// Create a product
router.post(`${BASE_URL}/createProduct`, ProductController.createProduct)

module.exports = router
