const express = require('express')

// get controller function
const {
  getOrigines,
  createOrigine,
  getOrigine,
  deleteOrigine,
  updateOrigine,
} = require('../controllers/origine')

const Origine = require('../models/Origine')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router.route('/').get(advancedResults(Origine), getOrigines).post(createOrigine)
router.route('/:id').get(getOrigine).delete(deleteOrigine).put(updateOrigine)

module.exports = router
