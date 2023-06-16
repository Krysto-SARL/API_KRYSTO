const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Order = require('../models/Order')

//@description:     Get all orders
//@ route:          GET /krysto/api/v1/orders
//@access:          Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single order
//@ route:          GET /krysto/api/v1/:id
//@access:          Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    return next(
      new ErrorResponse(`order not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: order })
})

// TO DO CREATE ORDER


//@description:     Update order
//@ route:          PUT /krysto/api/v1/orders/:id
//@access:          Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: order,
  })
})

//@description:     Delete order
//@ route:          DELETE /krysto/api/v1/orders/:id
//@access:          Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(
      new ErrorResponse(`order not found with ID of ${req.params.id}`, 404),
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

  order.remove()

  res.status(200).json({ success: true, data: {} })
})

// // @desc      Upload photo for product category
// // @route     PUT /api/v1/productCategories/:id/photo
// // @access    Private
// exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
//   const product = await Product.findById(req.params.id)

//   if (!product) {
//     return next(
//       new ErrorResponse(`Product  not found with id of ${req.params.id}`, 404),
//     )
//   }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400))
//   }

//   const file = req.files.photo

//   //   console.log(file)

//   // Make sure the image is a photo
//   if (!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image file`, 400))
//   }

//   // Check filesize
//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//         400,
//       ),
//     )
//   }

//   // Create custom filename
//   file.name = `product_photo_${product._id}${path.parse(file.name).ext}`

//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
//     if (err) {
//       console.error(err)
//       return next(new ErrorResponse(`Problem with file upload`, 500))
//     }

//     await Product.findByIdAndUpdate(req.params.id, { photo: file.name })

//     res.status(200).json({
//       success: true,
//       data: file.name,
//     })
//   })
// })
