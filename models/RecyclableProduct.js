const mongoose = require('mongoose')

// Définition du schéma pour les articles
const RecyclableProductSchema = new mongoose.Schema({
  codeBarre: {
    type: String,
    unique: true,
    required: true,
  },
  photo: {
    type: String,
    default: 'no-photo.png',
  },

  marque: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  remarque: {
    type: String,
    required: true,
  },

  recyclableByKrysto: {
    type: Boolean,
    required: true,
  },
  recyclabilityScore: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },

  plasticTypes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlasticType',
    },
  ],
})

// Création du modèle d'articles basé sur le schéma
const RecyclableProduct = mongoose.model(
  'RecyclableProduct',
  RecyclableProductSchema,
)

module.exports = RecyclableProduct
