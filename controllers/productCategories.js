const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const ProductCategory = require('../models/ProductCategory')

//@description:     Get all product categories
//@ route:          GET /krysto/api/v2/productCategories
//@access:          Public
exports.getProductCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single collectPoint
//@ route:          GET /krysto/api/v2/collectPoints/:id
//@access:          Public
exports.getProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(req.params.id)
  if (!ProductCategory) {
    return next(
      new ErrorResponse(
        `Product category not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(200).json({ success: true, data: productCategory })
})

//@description:     Create new collect point
//@ route:          POST /krysto/api/v1/partners
//@access:          Private
exports.createProductCategory = asyncHandler(async (req, res, next) => {
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

  const productCategory = await ProductCategory.create(req.body)
  res.status(201).json({
    success: true,
    data: productCategory,
  })
})

//@description:     Update a collect point
//@ route:          PUT /krysto/api/v1/collectPoints/:id
//@access:          Private
exports.updateProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: productCategory,
  })
})

//@description:     Delete a collect point
//@ route:          DELETE /krysto/api/v1/collectPoint/:id
//@access:          Private
exports.deleteProductCategory = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(req.params.id)

  if (!productCategory) {
    return next(
      new ErrorResponse(
        `product Category not found with ID of ${req.params.id}`,
        404,
      ),
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

  productCategory.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc      Upload QR code for collect points
// @route     PUT /api/v1/collectPoints/:id/qr
// @access    Private
// exports.collectPointQrUpload = asyncHandler(async (req, res, next) => {
//   const collectPoint = await CollectPoint.findById(req.params.id)

//   if (!collectPoint) {
//     return next(
//       new ErrorResponse(
//         `Collect point not found with id of ${req.params.id}`,
//         404,
//       ),
//     )
//   }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400))
//   }

//   const file = req.files.file

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
//   file.name = `collectPoint_QRCode_${collectPoint._id}${
//     path.parse(file.name).ext
//   }`

//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
//     if (err) {
//       console.error(err)
//       return next(new ErrorResponse(`Problem with file upload`, 500))
//     }

//     await CollectPoint.findByIdAndUpdate(req.params.id, { photo: file.name })

//     res.status(200).json({
//       success: true,
//       data: file.name,
//     })
//   })
// })
