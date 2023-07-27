const mongoose = require('mongoose')

// Définition du schéma pour les articles
const RecyclableProductSchema = new mongoose.Schema(
  {
    // General product information
    recyclableProductCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RecyclableProductCategory',
      required: true,
    },
    codeBarre: { type: String, unique: true, required: true },
    marque: { type: String, required: true },
    designation: { type: String, required: true },
    genericName: { type: String },
    quantity: { type: String },
    photo: { type: String, default: 'no-photo.png' },

    // Product composition
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    additives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Additive' }],
    containsPalmOil: { type: Boolean, default: false },

    // Nutrition facts
    nutritionFacts: {
      energy: { per100g: String, perPortion: String },
      fats: { per100g: String, perPortion: String },
      saturatedFats: { per100g: String, perPortion: String },
      carbohydrates: { per100g: String, perPortion: String },
      sugars: { per100g: String, perPortion: String },
      dietaryFibers: { per100g: String, perPortion: String },
      proteins: { per100g: String, perPortion: String },
      salt: { per100g: String, perPortion: String },
      alcohol: { per100g: String, perPortion: String },
      fruitsVegetablesNutsAndRapeseedWalnutAndOliveOils: {
        per100g: String,
        perPortion: String,
      },
      portionSize: String,
    },

    // Product scores
    ecoScore: { type: mongoose.Schema.Types.ObjectId, ref: 'EcoScore' },
    nutriScore: { type: mongoose.Schema.Types.ObjectId, ref: 'NutriScore' },
    novaScore: { type: mongoose.Schema.Types.ObjectId, ref: 'NovaScore' },

    // Product handling and disposal
    recyclableByKrysto: { type: Boolean },
    plasticTypes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'PlasticType' },
    ],
    garbageTypes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'GarbageType' },
    ],

    // Regulations
    environementReglementation: { type: String },

    // Transportation and origin
    provenanceCountry: { type: String },
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

    // Other
    remarque: { type: String },
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
