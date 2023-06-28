const express = require('express')
const {
  getPlasticType,
  createPlasticType,
  deletePlasticType,
  updatePlasticType,
  getPlasticTypes,
  uploadPlasticTypePhoto,
} = require('../controllers/plasticTypes')
const router = express.Router()
const { protect, authorize } = require('../middlewares/auth')
const PlasticType = require('../models/PlasticType')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(advancedResults(PlasticType), getPlasticTypes)
  .post(protect, authorize('admin'), createPlasticType)

router
  .route('/:id')
  .get(getPlasticType)
  .delete(protect, authorize('admin'), deletePlasticType)
  .put(protect, authorize('admin'), updatePlasticType)

router
  .route('/:id/photo')
  .put(protect, authorize('admin'), uploadPlasticTypePhoto)

module.exports = router
