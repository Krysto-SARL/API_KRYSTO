const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const geocoder = require('../utils/geocoder')

const CollectPoint = require('../models/CollectPoint')

//@description:     Get all collect points
//@ route:          GET /krysto/api/v2/collectPoints
//@access:          Public
exports.getCollectPoints = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single collectPoint
//@ route:          GET /krysto/api/v2/collectPoints/:id
//@access:          Public
exports.getCollectPoint = asyncHandler(async (req, res, next) => {
  const collectPoint = await CollectPoint.findById(req.params.id).populate(
    'collects user',
  )
  if (!collectPoint) {
    return next(
      new ErrorResponse(
        `Collect Point not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(200).json({ success: true, data: collectPoint })
})

//@description:     Create new collect point
//@ route:          POST /krysto/api/v1/partners
//@access:          Private
exports.createCollectPoint = asyncHandler(async (req, res, next) => {
  const collectPoint = await CollectPoint.create(req.body)
  res.status(201).json({
    success: true,
    data: collectPoint,
  })
})

//@description:     Update a collect point
//@ route:          PUT /krysto/api/v1/collectPoints/:id
//@access:          Private
exports.updateCollectPoint = asyncHandler(async (req, res, next) => {
  const collectPoint = await CollectPoint.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: collectPoint,
  })
})

//@description:     Delete a collect point
//@ route:          DELETE /krysto/api/v1/collectPoint/:id
//@access:          Private
exports.deleteCollectPoint = asyncHandler(async (req, res, next) => {
  const collectPoint = await CollectPoint.findById(req.params.id)

  if (!collectPoint) {
    return next(
      new ErrorResponse(
        `collect point not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  collectPoint.remove()

  res.status(200).json({ success: true, data: {} })
})

// @description      Get collect points within a radius
// @route            GET /api/v1/collectPoints/radius/:zipcode/:distance
// @access           Private

exports.getCollectPointsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude

  const radius = distance / 6378

  const collectPoints = await CollectPoint.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })

  res.status(200).json({
    success: true,
    count: collectPoints.length,
    data: collectPoints,
  })
})

// @desc      Upload QR code for collect points
// @route     PUT /api/v1/collectPoints/:id/qr
// @access    Private
exports.collectPointQrUpload = asyncHandler(async (req, res, next) => {
  const collectPoint = await CollectPoint.findById(req.params.id)

  if (!collectPoint) {
    return next(
      new ErrorResponse(
        `Collect point not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.qrCode
  console.log(file)

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  file.name = `collectPoint_QRCode_${collectPoint._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await CollectPoint.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
