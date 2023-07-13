const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')
const Collect = require('./Collect')

const CustomerSchema = new mongoose.Schema(
  {
    origine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Origine',
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
      },
    ],

    entity: {
      type: String,
      enum: ['Entreprise', 'Institution', 'Organisme financier', 'Association'],
    },

    ridet: {
      type: String,
    },
    website: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    state: {
      type: String,
      enum: ['Prospect', 'Gagné', 'Sans suite', 'Perdu'],
    },

    logo: {
      type: String,
      default: 'no-photo.png',
    },

    customerName: {
      type: String,
      required: [true, "Merci d'entrer un nom pour ce client"],
    },

    address: {
      type: String,
      required: [true, 'Please add an address'],
    },

    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Geocode & create location field
CustomerSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  // // Do not save address in DB
  // this.address = undefined;
  next()
})

module.exports = mongoose.model('Customer', CustomerSchema)
