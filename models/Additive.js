const mongoose = require('mongoose')

const AdditiveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: 'WIKIPEDIA',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

const Additive = mongoose.model('Additive', AdditiveSchema)

module.exports = Additive
