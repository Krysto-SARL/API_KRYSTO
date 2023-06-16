const express = require('express')
// get controller function
const {
  getOrderLignes, getOrderLigne, updateOrderLigne, deleteOrderLigne
} = require('../controllers/orderLignes')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const OrderLigne = require('../models/OrderLigne')
const advancedResults = require('../middlewares/advancedResults')

router.route('/').get(advancedResults(OrderLigne), getOrderLignes)
router.route('/:id').get(getOrderLigne).put(updateOrderLigne).delete(deleteOrderLigne)


module.exports = router
