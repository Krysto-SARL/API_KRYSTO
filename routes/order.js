const express = require('express')
// get controller function
const {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  createOrder,
} = require('../controllers/orders')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Order = require('../models/Order')
const orderLigneRouter = require('./orderLignes')
const advancedResults = require('../middlewares/advancedResults')
const path = require('path')
//re-route into other ressource router
router.use('/:orderId/orderLines', orderLigneRouter)
// include another source router

router
  .route('/')
  .get(
    advancedResults(Order, {
      path: 'orderLignes',
    }),
    getOrders,
  )
  .post(createOrder)
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder)

module.exports = router
