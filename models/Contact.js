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
      required: [true, "Meric d'entrer un prénom pour ce contact"],
    },

    lastname: {
      type: String,
      required: [true, "Meric d'entrer un prénom pour ce contact"],
    },

    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
    },

    phone2: {
      type: String,
      unique: false,
    },

    function: {
      type: String,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Contact', ContactSchema)
