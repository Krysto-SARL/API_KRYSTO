const express = require('express')
// get controller function
const {
  getCollectPointsInRadius,
  getCollectPoints,
  createCollectPoint,
  getCollectPoint,
  updateCollectPoint,
  deleteCollectPoint,
  collectPointQrUpload,
} = require('../controllers/collectPoints')
const collectRouter = require('./collects')

const router = express.Router({ mergeParams: true })
router.use('/:collectPointId/collects', collectRouter)
const { protect, authorize } = require('../middlewares/auth')

const advancedResults = require('../middlewares/advancedResults')
const CollectPoint = require('../models/CollectPoint')

router.route('/radius/:zipcode/:distance').get(getCollectPointsInRadius)
router
  .route('/')
  .get(advancedResults(CollectPoint, 'collects user'), getCollectPoints)
  .post(createCollectPoint)
router
  .route('/:id')
  .get(getCollectPoint)
  .put(updateCollectPoint)
  .delete(deleteCollectPoint)

router.route('/:id/qr').put(collectPointQrUpload)

module.exports = router
