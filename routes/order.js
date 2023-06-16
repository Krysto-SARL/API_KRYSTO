const express = require('express')
// get controller function
const {
  getOrders, getOrder, updateOrder, deleteOrder
} = require('../controllers/orders')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

const orderLigneRouter = require('./orderLignes')

const Order = require('../models/Order')
const advancedResults = require('../middlewares/advancedResults')
router.use('/:orderId/orders', orderLigneRouter)
router.route('/').get(advancedResults(Order), getOrders)
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder)



module.exports = router
