const mongoose = require('mongoose')

const OrigineSchema = new mongoose.Schema(
  {
    origineName: {
      type: String,
      required: [true, "Merci d'entrer un nom pour cette origine"],
      unique: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Origine', OrigineSchema)
