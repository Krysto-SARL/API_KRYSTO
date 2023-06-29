const express = require('express');
const {
  getGarbageTypes,
  createGarbageType,
  getGarbageType,
  updateGarbageType,
  deleteGarbageType,
} = require('../controllers/garbageType');

const GarbageType = require('../models/GarbageType');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(GarbageType, 'voluntaryDropPoint'), getGarbageTypes)
  .post(protect, authorize('admin'), createGarbageType);

router
  .route('/:id')
  .get(getGarbageType)
  .put(protect, authorize('admin'), updateGarbageType)
  .delete(protect, authorize('admin'), deleteGarbageType);

module.exports = router;