const express = require('express')
// get controller function
const {
  getOrderLignes,
  getOrderLigne,
  updateOrderLigne,
  deleteOrderLigne,
  createOrderLigne,
} = require('../controllers/orderLignes')
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const OrderLigne = require('../models/OrderLigne')
const advancedResults = require('../middlewares/advancedResults')

router
  .route('/')
  .get(
    advancedResults(OrderLigne, {
      path: 'product service order',
    }),
    getOrderLignes,
  )
  .post(createOrderLigne)
router
  .route('/:id')
  .get(getOrderLigne)
  .put(updateOrderLigne)
  .delete(deleteOrderLigne)

module.exports = router
