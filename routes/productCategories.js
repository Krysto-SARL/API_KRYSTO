const express = require('express')
// get controller function
const {
  getProductCategories,
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = require('../controllers/productCategories')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const ProductCategory = require('../models/ProductCategory')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(advancedResults(ProductCategory), getProductCategories)
  .post(createProductCategory)
router
  .route('/:id')
  .get(getProductCategory)
  .delete(deleteProductCategory)
  .put(updateProductCategory)

module.exports = router