const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const RecyclableProductCategory = require('../models/RecyclableProductCategory')

//@description:     Get all recyclable product categories
//@route:           GET /krysto/api/v2/recyclableProductCategories
//@access:          Public

exports.getRecyclableProductCategories = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  },
)

//@description:     Get a single recyclable product category
//@route:           GET /krysto/api/v2/recyclableProductCategories/:id
//@access:          Public
exports.getRecyclableProductCategory = asyncHandler(async (req, res, next) => {
  const recyclableProductCategory = await RecyclableProductCategory.findById(
    req.params.id,
  ).populate('recyclableProducts')

  if (!recyclableProductCategory) {
    return next(
      new ErrorResponse(
        `Recyclable product category not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: true, data: recyclableProductCategory })
})

//@description:     Create a new recyclable product category
//@route:           POST /krysto/api/v2/recyclableProductCategories
//@access:          Private
exports.createRecyclableProductCategory = asyncHandler(
  async (req, res, next) => {
    const recyclableProductCategory = await RecyclableProductCategory.create(
      req.body,
    )
    res.status(201).json({ success: true, data: recyclableProductCategory })
  },
)

//@description:     Update a recyclable product category
//@route:           PUT /krysto/api/v2/recyclableProductCategories/:id
//@access:          Private
exports.updateRecyclableProductCategory = asyncHandler(
  async (req, res, next) => {
    const recyclableProductCategory = await RecyclableProductCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({ success: true, data: recyclableProductCategory })
  },
)

//@description:     Delete a recyclable product category
//@route:           DELETE /krysto/api/v2/recyclableProductCategories/:id
//@access:          Private
exports.deleteRecyclableProductCategory = asyncHandler(
  async (req, res, next) => {
    const recyclableProductCategory = await RecyclableProductCategory.findById(
      req.params.id,
    )

    if (!recyclableProductCategory) {
      return next(
        new ErrorResponse(
          `Recyclable product category not found with ID of ${req.params.id}`,
          404,
        ),
      )
    }

    recyclableProductCategory.remove()

    res.status(200).json({ success: true, data: {} })
  },
)
