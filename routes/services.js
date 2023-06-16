const express = require('express')
// get controller function
const {
  getServices, getService, updateService, deleteService
} = require('../controllers/service')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Service = require('../models/Service')
const advancedResults = require('../middlewares/advancedResults')

router.route('/').get(advancedResults(Service), getServices)
router.route('/:id').get(getService).put(updateService).delete(deleteService)


module.exports = router
