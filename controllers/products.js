const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Product = require('../models/Product')

//@description:     Get all products
//@ route:          GET /krysto/api/v2/products
//@access:          Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single product
//@ route:          GET /krysto/api/v2/collectPoints/:id
//@access:          Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!Product) {
    return next(
      new ErrorResponse(`Product not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: product })
})

//@description:     Create new collect point
//@ route:          POST /krysto/api/v1/partners
//@access:          Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Add user to req.body

  // // Check for published partner
  // const publishedUser = await CollectPoint.findOne({ user: req.user.id });

  // // If the user is not an admin, they can only add one collect point
  // if (publishedUser && req.user.role != "admin") {
  //   return next(
  //     new ErrorResponse(
  //       `The user with ID ${req.user.id} has already published a collect point`,
  //       400
  //     )
  //   );
  // }

  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    data: product,
  })
})

//@description:     Update a collect point
//@ route:          PUT /krysto/api/v1/collectPoints/:id
//@access:          Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: product,
  })
})

//@description:     Delete product
//@ route:          DELETE /krysto/api/v1/collectPoint/:id
//@access:          Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(
      new ErrorResponse(`product not found with ID of ${req.params.id}`, 404),
    )
  }

  //   // Make sure user is user owner
  //   if (user.toString() !== req.user.id && req.user.role !== admin) {
  //     return next(
  //       new ErrorResponse(
  //         `The user with ID ${req.user.id} is not authorize to update this collect point`,
  //         401
  //       )
  //     );
  //   }

  product.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload photo for product category
// @route     PUT /api/v1/productCategories/:id/photo
// @access    Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(
      new ErrorResponse(`Product  not found with id of ${req.params.id}`, 404),
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
  file.name = `product_photo_${product._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Product.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
