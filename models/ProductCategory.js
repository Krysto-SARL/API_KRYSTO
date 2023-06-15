const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Aucun nom'],
    },

    photo: {
      type: String,
      default: 'no-photo.png',
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('ProductCategory', ProductCategorySchema)
