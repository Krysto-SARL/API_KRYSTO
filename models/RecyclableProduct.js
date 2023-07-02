const mongoose = require('mongoose')

// Définition du schéma pour les articles
const RecyclableProductSchema = new mongoose.Schema(
  {
    recyclableProductCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RecyclableProductCategory',
      required: true,
    },

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
    },
    environementReglementation: {
      type: String,
    },

    recyclableByKrysto: {
      type: Boolean,
      required: true,
    },
    ecoScore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EcoScore',
    },

    plasticTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlasticType',
      },
    ],

    garbageTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GarbageType',
      },
    ],

    nutriScore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NutriScore',
    },

    transportation: {
      type: String,
      enum: [
        'Fabriquée en Nouvelle-Calédonie',
        'Transformée en Nouvelle-Calédonie',
        'Importée',
      ],
      default: 'Importée',
      required: true,
    },

    containsPalmOil: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Création du modèle d'articles basé sur le schéma
const RecyclableProduct = mongoose.model(
  'RecyclableProduct',
  RecyclableProductSchema,
)

module.exports = RecyclableProduct
