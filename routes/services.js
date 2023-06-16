const express = require('express')
// get controller function
const {
  getServices,
  getService,
  updateService,
  deleteService,
  createService,
  servicePhotoUpload,
} = require('../controllers/service')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Service = require('../models/Service')
const advancedResults = require('../middlewares/advancedResults')

router.route('/').get(advancedResults(Service), getServices).post(createService)
router.route('/:id').get(getService).put(updateService).delete(deleteService)
router.route('/:id/photo').put(servicePhotoUpload)

module.exports = router
