const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Collect = require('../models/Collect')
const CollectPoint = require('../models/CollectPoint')

//@description:     Get all collects
//@ route:          GET /krysto/api/v1/collects
//@ route:          GET /krysto/api/v1/collectPoints/:collectPointId/collects
//@access:          Public

// exports.getCollects = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.advancedResults)
// })
exports.getCollects = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.collectPointId) {
    query = Collect.find({ collectPoint: req.params.collectPointId })
  } else {
    query = Collect.find()
  }

  const collects = await query
  res.status(200).json({
    success: true,
    count: collects.length,
    data: collects,
  })
})

//@description:     Get a single collects
//@ route:          GET /krysto/api/v1/collects/:id
//@access:          Public
exports.getCollect = asyncHandler(async (req, res, next) => {
  const collect = await Collect.findById(req.params.id).populate(
    'collectPoint certificat',
  )
  if (!collect) {
    return next(
      new ErrorResponse(`Collect not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: collect })
})

//@description:     Create a collect for specific collect point
//@ route:          POST /krysto/api/v1/collectPoints/:collectPointId/collects
//@access:          Private
exports.createCollect = asyncHandler(async (req, res, next) => {
  req.body.collectPoint = req.params.collectPointId

  const collectPoint = await CollectPoint.findById(req.params.collectPointId)

  if (!collectPoint) {
    return next(
      new ErrorResponse(
        `No collectPoint with the id of ${req.params.partnerId}`,
      ),
      404,
    )
  }

  const collect = await Collect.create(req.body)

  res.status(200).json({
    success: true,
    data: collect,
  })
})

//@description:     Create a collect for specific collect point
//@ route:          POST /krysto/api/v2/collectPoints/:collectPointId/collects
//@access:          Private
exports.createCollect = asyncHandler(async (req, res, next) => {
  req.body.collectPoint = req.params.collectPointId

  const collectPoint = await CollectPoint.findById(req.params.collectPointId)

  if (!collectPoint) {
    return next(
      new ErrorResponse(
        `No collectPoint with the id of ${req.params.partnerId}`,
      ),
      404,
    )
  }

  const collect = await Collect.create(req.body)

  res.status(200).json({
    success: true,
    data: collect,
  })
})

//@description:     Update a collect
//@ route:          PUT /krysto/api/v1/collect/:id
//@access:          Private
exports.updateCollect = asyncHandler(async (req, res, next) => {
  const collect = await Collect.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: collect,
  })
})
