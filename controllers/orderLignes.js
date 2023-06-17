const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const OrderLigne = require('../models/OrderLigne')
const Order = require('../models/Order')

//@description:     Get all orderLignes
//@ route:          GET /krysto/api/v1/orderLignes
//@ route:          GET /krysto/api/v1/orders/:orderId/orderLignes
//@access:          Public
exports.getOrderLignes = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.orderId) {
    query = OrderLigne.find({ order: req.params.orderId })
  } else {
    return res.status(200).json(res.advancedResults)
  }

  const orderLignes = await query

  res.status(200).json({
    success: true,
    count: orderLignes.length,
    data: orderLignes,
  })
})

//@description:     Get a single Order ligne
//@ route:          GET /krysto/api/v2/orderLignes/:id
//@access:          Public
exports.getOrderLigne = asyncHandler(async (req, res, next) => {
  const orderLigne = await OrderLigne.findById(req.params.id).populate({
    path: 'order product service',
  })
  if (!orderLigne) {
    return next(
      new ErrorResponse(
        `Order Ligne not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(200).json({ success: true, data: orderLigne })
})

// // @description:     Create order ligne for specific order
// // @ route:          POST /krysto/api/v1/orders/:orderId/orderLignes
// // @access:          Private
// exports.createOrderLigne = asyncHandler(async (req, res, next) => {
//     req.body.order = req.params.orderId;

//     const order = await Order.findById(req.params.orderId);

//     if (!order) {
//       return next(
//         new ErrorResponse(`No order with the id of ${req.params.orderId}`),
//         404
//       );
//     }

//     const orderLigne = await OrderLigne.create(req.body);

//     res.status(200).json({
//       success: true,
//       data: orderLigne,
//     });
//   });

//@description:     Update order ligne
//@ route:          PUT /krysto/api/v1/collectPoints/:id
//@access:          Private
exports.updateOrderLigne = asyncHandler(async (req, res, next) => {
  const orderLigne = await OrderLigne.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: orderLigne,
  })
})

//@description:     Delete order ligne
//@ route:          DELETE /krysto/api/v1/orderLignes/:id
//@access:          Private
exports.deleteOrderLigne = asyncHandler(async (req, res, next) => {
  const orderLigne = await OrderLigne.findById(req.params.id)

  if (!orderLigne) {
    return next(
      new ErrorResponse(
        `orderLigne not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  orderLigne.remove()

  res.status(200).json({ success: true, data: {} })
})
