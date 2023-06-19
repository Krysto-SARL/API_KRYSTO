const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const ProductCategory = require('../models/ProductCategory')
const { v4: uuidv4 } = require('uuid')

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
  const productCategory = await ProductCategory.findById(
    req.params.id,
  ).populate('products')
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

// @desc      Upload photos for product category
// @route     PUT /api/v1/productCategories/:id/photo
// @access    Private

exports.productCategoryPhotoUpload = asyncHandler(async (req, res, next) => {
  const productCategory = await ProductCategory.findById(req.params.id)

  if (!productCategory) {
    return next(
      new ErrorResponse(
        `Product category not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  if (!req.files || !req.files.photos) {
    return next(new ErrorResponse(`Please upload one or more files`, 400))
  }

  const files = req.files.photos
  console.log(files)

  // Check if all uploaded files are images
  const areAllImages = files.every((file) => file.mimetype.startsWith('image'))
  if (!areAllImages) {
    return next(new ErrorResponse(`Please upload image files only`, 400))
  }

  // Check filesize for each file
  const maxSizeInBytes = process.env.MAX_FILE_UPLOAD
  const oversizedFiles = files.filter((file) => file.size > maxSizeInBytes)
  if (oversizedFiles.length > 0) {
    const filenames = oversizedFiles.map((file) => file.name).join(', ')
    return next(
      new ErrorResponse(
        `The following files exceed the maximum upload size of ${maxSizeInBytes} bytes: ${filenames}`,
        400,
      ),
    )
  }

  // Generate filenames for each file
  const productCategoryId = productCategory._id
  const uploadPath = process.env.FILE_UPLOAD_PATH

  const filePromises = files.map((file) => {
    const ext = path.parse(file.name).ext
    const filename = `photo__${file.name}`

    return file.mv(`${uploadPath}/${filename}`)
  })

  // Move and update the database once all files are uploaded
  await Promise.all(filePromises)

  const filenames = files.map((file) => file.name)
  await ProductCategory.findByIdAndUpdate(req.params.id, { photos: filenames })

  res.status(200).json({
    success: true,
    data: filenames,
  })
})
