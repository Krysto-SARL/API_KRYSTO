const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    numOrder: {
      type: String,
      unique: true,
      default: 100001,
    },

    devis: {
      type: Boolean,
      default: true,
    },
    billsDate: {
      type: Date,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    paymentDate: {
      type: Date,
    },
    remarque: {
      type: String,
      required: [true, 'Aucune déscription'],
      maxlength: [500, 'Name can not be more than 500 characters'],
      default: 'aucune description',
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Fonction middleware pre-save pour générer le numéro d'ordre
OrderSchema.pre('save', async function (next) {
  // Vérifier si le document est nouveau (n'a pas encore de numéro d'ordre)
  if (this.isNew) {
    // Récupérer le dernier numéro d'ordre dans la collection
    const lastDocument = await this.constructor.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    )
    let lastNumOrder = 0

    // Si un document existe, extraire le numéro d'ordre et l'incrémenter
    if (lastDocument && lastDocument.numOrder) {
      const lastNum = parseInt(lastDocument.numOrder.replace('D-', ''), 10)
      lastNumOrder = isNaN(lastNum) ? 0 : lastNum
    }

    // Générer le nouveau numéro d'ordre en incrémentant le dernier numéro
    const newNumOrder = lastNumOrder + 1

    // Assigner le nouveau numéro d'ordre au champ numOrder du document en cours
    this.numOrder = `D-${newNumOrder}`
  }

  next()
})

// reverse populate with virtuals

OrderSchema.virtual('orderLignes', {
  ref: 'OrderLigne',
  localField: '_id',
  foreignField: 'order',
  justOne: false,
})

module.exports = mongoose.model('Order', OrderSchema)
