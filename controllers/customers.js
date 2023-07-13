const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Customer = require('../models/Customers')
const path = require('path')

// @desc      Get all customers
// @route     GET /api/v1/auth/customers
// @access    Private/Admin
exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single customer
// @route     GET /api/v1/auth/customers/:id
// @access    Private/Admin
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: customer,
  })
})

//@description: Create a new customer
//@route: POST /krysto/api/v2/customers
//@access: Private
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body)
  res.status(201).json({
    success: true,
    data: customer,
  })
})

// @desc      Update customer
// @route     PUT /api/v1/auth/customers/:id
// @access    Private/Admin

exports.updateCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: customer,
  })
})

// @desc      Delete customer
// @route     DELETE /api/v1/auth/customers/:id
// @access    Private/Admin
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  await Customer.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Upload photo for customer
// @route     PUT /api/v1/customers/:id/logo
// @access    Private
exports.customerLogoUpload = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) {
    return next(
      new ErrorResponse(`Customer  not found with id of ${req.params.id}`, 404),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.logo

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
  file.name = `customer_logo_${customer._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Customer.findByIdAndUpdate(req.params.id, { logo: file.name })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})
