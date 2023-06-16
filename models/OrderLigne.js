const mongoose = require('mongoose')

const OrderLigneSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    tgc: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Ajouter un hook "pre" pour mettre à jour le montant de la remise avant chaque sauvegarde
OrderLigneSchema.pre('save', function (next) {
  // Vérifier si la quantité commandée est supérieure à une valeur spécifique pour appliquer une remise
  if (this.quantity >= 10) {
    // Appliquer une remise de 10% si la quantité commandée est supérieure ou égale à 10
    this.discount = this.quantity * 0.1 * 10
  } else if (this.quantity >= 20) {
    this.discount = this.quantity * 0.2 * 10
  } else {
    // Réinitialiser la remise à zéro si la quantité commandée est inférieure à 10
    this.discount = 0
  }
  next()
})

module.exports = mongoose.model('OrderLigne', OrderLigneSchema)
