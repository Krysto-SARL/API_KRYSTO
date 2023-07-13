const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ['Mr', 'Mme', 'Melle'],
      default: 'Mr',
    },
    detail: {
      type: String,
      default: 'aucun détails pour ce contact',
    },
    firstname: {
      type: String,
      required: [true, "Merci d'entrer un prénom pour ce contact"],
    },
    lastname: {
      type: String,
      required: [true, "Merci d'entrer un nom de famille pour ce contact"],
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez entrer une adresse email valide',
      ],
    },
    phone: {
      type: String,
      unique: true,
    },
    phone2: {
      type: String,
    },
    contactFunction: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Contact', ContactSchema)
