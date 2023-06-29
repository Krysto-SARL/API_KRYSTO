const express = require('express')
const router = express.Router()
const {
  getRecyclableProducts,
  getRecyclableProduct,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
  recyclableProductPhotoUpload,
} = require('../controllers/recyclableProducts')
const { protect, authorize } = require('../middlewares/auth')
const RecyclableProduct = require('../models/RecyclableProduct')
const advancedResults = require('../middlewares/advancedResults')
const PlasticType = require('../models/PlasticType')

router
  .route('/')
  .get(
    advancedResults(RecyclableProduct, 'recyclableProductCategory'),
    getRecyclableProducts,
  )
  .post(createRecyclableProduct)

router
  .route('/:id')
  .get(getRecyclableProduct)
  .put(updateRecyclableProduct)
  .delete(deleteRecyclableProduct)

router.route('/:id/photo').put(recyclableProductPhotoUpload)

module.exports = router