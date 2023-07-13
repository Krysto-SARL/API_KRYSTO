const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Origine = require('../models/Origine')

//@description:     Get all origines
//@ route:          GET /krysto/api/v1/origines
//@access:          Private
exports.getOrigines = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single origine
//@ route:          GET /krysto/api/v1/origines/:id
//@access:          Private
exports.getOrigine = asyncHandler(async (req, res, next) => {
  const origine = await Origine.findById(req.params.id)
  if (!origine) {
    return next(
      new ErrorResponse(`Origine not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: origine })
})

//@description:     Create new message
//@ route:          POST /krysto/api/v1/origines
//@access:          Public
exports.createOrigine = asyncHandler(async (req, res, next) => {
  const origine = await Origine.create(req.body)
  res.status(201).json({
    success: true,
    data: origine,
  })
})

exports.updateOrigine = asyncHandler(async (req, res, next) => {
  const origine = await Origine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: origine,
  })
})

//@description:     Delete a origine
//@ route:          DELETE /krysto/api/v1/origines/:id
//@access:          Private
exports.deleteOrigine = asyncHandler(async (req, res, next) => {
  const message = await Origine.findById(req.params.id)

  if (!message) {
    return next(
      new ErrorResponse(`Origine not found with ID of ${req.params.id}`, 404),
    )
  }

  Origine.remove()

  res.status(200).json({ success: true, data: {} })
})
