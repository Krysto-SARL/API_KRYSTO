const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const RecyclableProduct = require('../models/RecyclableProduct')
//@description:     Get all recyclable products
//@route:           GET /krysto/api/v2/recyclableProducts
//@access:          Public
exports.getRecyclableProducts = asyncHandler(async (req, res, next) => {
  const recyclableProducts = await RecyclableProduct.find()

  res.status(200).json({
    success: true,
    data: recyclableProducts,
  })
})

//@description:     Get a single recyclable product
//@route:           GET /krysto/api/v2/recyclableProducts/:id
//@access:          Public
exports.getRecyclableProduct = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.findById(req.params.id)

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(
        `Recyclable product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: recyclableProduct,
  })
})

//@description:     Create a recyclable product
//@route:           POST /krysto/api/v2/recyclableProducts
//@access:          Private
exports.createRecyclableProduct = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.create(req.body)

  res.status(201).json({
    success: true,
    data: recyclableProduct,
  })
})

//@description:     Update a recyclable product
//@route:           PUT /krysto/api/v2/recyclableProducts/:id
//@access:          Private
exports.updateRecyclableProduct = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(
        `Recyclable product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: recyclableProduct,
  })
})

//@description:     Delete a recyclable product
//@route:           DELETE /krysto/api/v2/recyclableProducts/:id
//@access:          Private
exports.deleteRecyclableProduct = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.findByIdAndDelete(
    req.params.id,
  )

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(
        `Recyclable product not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Upload photo for product category
// @route     PUT /api/v1/productCategories/:id/photo
// @access    Private
exports.recyclableProductPhotoUpload = asyncHandler(async (req, res, next) => {
  const recyclableProduct = await RecyclableProduct.findById(req.params.id)

  if (!recyclableProduct) {
    return next(
      new ErrorResponse(
        `recyclable product  not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.photo

  //   console.log(file)

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
  file.name = `recyclable_product_photo_${recyclableProduct._id}${
    path.parse(file.name).ext
  }`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await RecyclableProduct.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
