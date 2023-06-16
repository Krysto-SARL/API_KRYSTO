const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
      required: [true, "Aucune déscription"],
      maxlength: [500, "Name can not be more than 500 characters"],
      default: "aucune description",
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Order", OrderSchema);
