const express = require('express')
const {
  getRecyclableProductCategories,
  getRecyclableProductCategory,
  createRecyclableProductCategory,
  updateRecyclableProductCategory,
  deleteRecyclableProductCategory,
} = require('../controllers/recyclableProductCategories')

const router = express.Router()
const RecyclableProductCategory = require('../models/RecyclableProductCategory')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(
    advancedResults(RecyclableProductCategory, 'recyclableProducts'),
    getRecyclableProductCategories,
  )
  .post(createRecyclableProductCategory)
router
  .route('/:id')
  .get(getRecyclableProductCategory)
  .put(updateRecyclableProductCategory)
  .delete(deleteRecyclableProductCategory)

module.exports = router
