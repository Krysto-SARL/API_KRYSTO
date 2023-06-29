const mongoose = require('mongoose')

const GarbageTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'no-photo.png',
    },

    containerColor: {
      type: String,
    },
    voluntaryDropPoints: {
      type: String,
    },

    détails: {
      type: String,
      maxlength: [300, 'Remarque cannot be more than 300 characters'],
      default: 'Aucun détail pour ce déchet',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
// // reverse populate with virtuals

GarbageTypeSchema.virtual('voluntaryDropPoint', {
  ref: 'VoluntaryDropPoint',
  localField: '_id',
  foreignField: 'garbage',
  justOne: false,
})

module.exports = mongoose.model('GarbageType', GarbageTypeSchema)
