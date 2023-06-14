const mongoose = require('mongoose')

const WasteSchema = new mongoose.Schema(
  {
    wasteCategory: {
      type: String,
      enum: [
        'Aluminium',
        'Plastique',
        'Papier',
        'Carton',
        'Déchets alimentaire',
        'Papier confidentiel',
        'Verre',
        'Capsule',
      ],
      required: [true, "Merci d'ajouter un type de dechets"],
      default: 'Plastique',
    },

    wasteType: String,

    plasticType: {
      type: String,
      enum: ['PET', 'PP', 'HDPE', 'PEHD', 'PS', 'PVC', 'PLA', 'Autres', 'MIX'],
    },

    image: {
      type: String,
    },

    détails: {
      type: String,
      maxlength: [100, 'Remarque can not be more than 100 characters'],
      default: 'Aucun détail pour ce déchets',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
// reverse populate with virtuals

WasteSchema.virtual('collectPoints', {
  ref: 'CollectPoint',
  localField: '_id',
  foreignField: 'waste',
  justOne: false,
})

module.exports = mongoose.model('Waste', WasteSchema)
