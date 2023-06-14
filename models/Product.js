const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
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
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Product', ProductSchema)
