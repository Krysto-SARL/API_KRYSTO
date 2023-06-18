const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    size: {
      type: String,
    },
    unitWeight: {
      type: String,
    },

    unitPrice: {
      type: Number,
    },
    tgc: {
      type: Number,
      required: [true],
      default: 22,
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
