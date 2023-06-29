const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const RecyclableProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// reverse populate with virtuals

RecyclableProductCategorySchema.virtual('recyclableProducts', {
  ref: 'RecyclableProduct',
  localField: '_id',
  foreignField: 'recyclableProductCategory',
  justOne: false,
})

module.exports = mongoose.model(
  'RecyclableProductCategory',
  RecyclableProductCategorySchema,
)
