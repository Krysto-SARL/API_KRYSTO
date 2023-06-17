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

// @description:     Create order ligne for specific order
// @route:          POST /krysto/api/v1/orders/:orderId/orderLignes
// @access:          Private
exports.createOrderLigne = asyncHandler(async (req, res, next) => {
  // Récupérer l'ID de la commande à partir des paramètres de la requête
  const orderId = req.params.orderId

  // Rechercher la commande dans la base de données
  const order = await Order.findById(orderId)

  // Vérifier si la commande existe
  if (!order) {
    return next(new ErrorResponse(`No order with the id of ${orderId}`), 404)
  }

  // Assigner l'ID de la commande à la propriété "order" de la requête
  req.body.order = orderId

  // Créer une nouvelle instance d'OrderLigne avec les données de la requête
  const orderLigne = await OrderLigne.create(req.body)

  // Envoyer une réponse JSON avec les détails de la nouvelle OrderLigne créée
  res.status(200).json({
    success: true,
    data: orderLigne,
  })
})

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
