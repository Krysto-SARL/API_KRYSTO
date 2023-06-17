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
      default: null,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: false,
      default: null,
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

// ajouter la remise

OrderLigneSchema.pre('save', function (next) {
  if (this.quantity >= 1 && this.quantity <= 10) {
    // Aucune remise pour une quantité de 1 à 10
    this.discount = 0
  } else if (this.quantity >= 11 && this.quantity <= 50) {
    // Appliquer une remise de 5% pour une quantité de 11 à 50
    this.discount = 5
  } else if (this.quantity >= 51 && this.quantity <= 100) {
    // Appliquer une remise de 10% pour une quantité de 51 à 100
    this.discount = 10
  } else if (this.quantity > 100) {
    // Appliquer une remise de 15% pour une quantité supérieure à 100
    this.discount = 15
  } else {
    // Réinitialiser la remise à zéro si la quantité est inférieure à 1
    this.discount = 0
  }
  next()
})

// Calculer le taux de TGC

OrderLigneSchema.pre('save', function (next) {
  if (this.product !== null) {
    // Si le champ "produit" n'est pas nul, le champ "tgc" est mis à 22
    this.tgc = 22
  } else if (this.service !== null) {
    // Si le champ "service" n'est pas nul, le champ "tgc" est mis à 3%
    this.tgc = 3
  } else {
    // Si à la fois le champ "produit" et le champ "service" sont nuls, le champ "tgc" est laissé inchangé
    // Assurez-vous que le champ "tgc" a une valeur par défaut appropriée dans votre schéma
  }
  next()
})

module.exports = mongoose.model('OrderLigne', OrderLigneSchema)
