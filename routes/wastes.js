const express = require('express');
const { getWastes, createWaste, getWaste, updateWaste, deleteWaste } = require('../controllers/Waste');

const Waste = require('../models/Waste');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');



router
  .route('/')
  .get(advancedResults(Waste, "collectPoints"), getWastes)
  .post(createWaste);

router
  .route('/:id')
  .get(getWaste)
  .put(updateWaste)
  .delete(deleteWaste);

module.exports = router;
