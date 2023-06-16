const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Aucun nom'],
    },

    photos: [
      {
        type: String,
        default: 'no-photo.png',
      },
    ],
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// reverse populate with virtuals

ProductCategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'productCategory',
  justOne: false,
})

module.exports = mongoose.model('ProductCategory', ProductCategorySchema)
