const express = require('express')
// get controller function
const {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  productPhotoUpload,
} = require('../controllers/products')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Product = require('../models/Product')
const advancedResults = require('../middlewares/advancedResults')

router.route('/').get(advancedResults(Product), getProducts).post(createProduct)
router.route('/:id').get(getProduct).delete(deleteProduct).put(updateProduct)

router.route('/:id/photo').put(productPhotoUpload)

module.exports = router
