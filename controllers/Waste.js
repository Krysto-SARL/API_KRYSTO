
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

const Waste = require("../models/Waste");
const CollectPoint = require("../models/CollectPoint");

//@description:     Get all wastes
//@ route:          GET /krysto/api/v1/wastes
//@access:          Public
exports.getWastes = asyncHandler(async (req, res, next) => {
 
  res
    .status(200)
    .json(res.advancedResults);
});

//@description:     Get a single waste
//@ route:          GET /krysto/api/v1/wastes/:id
//@access:          Public
exports.getWaste = asyncHandler(async (req, res, next) => {
  const waste = await Waste.findById(req.params.id).populate('collectPoints');
  if (!waste) {
    return next(
      new ErrorResponse(`Collect not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: waste });
});

//@description:     Create waste
//@ route:          POST /krysto/api/v1/wastes
//@access:          Private
exports.createWaste = asyncHandler(async (req, res, next) => {
  
  
    const waste = await Waste.create(req.body);
  
    res.status(200).json({
      success: true,
      data: waste,
    });
  });
  


//@description:     Update a waste
//@ route:          PUT /krysto/api/v1/waste/:id
//@access:          Private
exports.updateWaste = asyncHandler(async (req, res, next) => {
  const waste = await Waste.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: waste
  });
});

// @desc      Delete waste
// @route     DELETE /api/v1/wastes/:id
// @access    Private/Admin
exports.deleteWaste = asyncHandler(async (req, res, next) => {
    await Waste.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
