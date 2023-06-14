
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

const Certificat = require("../models/Certificat");
const Collect = require("../models/Collect");

//@description:     Get all collects
//@ route:          GET /krysto/api/v1/collects
//@access:          Public
exports.getCertificats = asyncHandler(async (req, res, next) => {
 
  res
    .status(200)
    .json(res.advancedResults);
});

//@description:     Get a single collects
//@ route:          GET /krysto/api/v1/collects/:id
//@access:          Public
exports.getCertificat = asyncHandler(async (req, res, next) => {
  const certificat = await Certificat.findById(req.params.id).populate('collect');
  if (!certificat) {
    return next(
      new ErrorResponse(`Certificat not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: certificat });
});

//@description:     Create a certificat from a spécific collect
//@ route:          POST /krysto/api/v2/collect/:collectId/certificats
//@access:          Private
exports.createCertificat = asyncHandler(async (req, res, next) => {
    req.body.collect = req.params.collectId;

    const collect = await Collect.findById(req.params.collectId);
  
    if (!collect) {
      return next(
        new ErrorResponse(`No collect with the id of ${req.params.collectId}`),
        404
      );
    }
  
    const certificat = await Certificat.create(req.body);
  
    res.status(200).json({
      success: true,
      data: certificat,
    });
  });
  


//@description:     Update a collect 
//@ route:          PUT /krysto/api/v1/collect/:id
//@access:          Private
exports.updateCertificat = asyncHandler(async (req, res, next) => {
  const certificat = await Certificat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: certificat
  });
});


