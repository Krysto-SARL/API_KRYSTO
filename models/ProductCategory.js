const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Aucun nom'],
    },
    description: {
      type: String,
      required: [true, 'Aucune déscription'],
      maxlength: [500, 'Name can not be more than 500 characters'],
      default: 'aucune description',
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
