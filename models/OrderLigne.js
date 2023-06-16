const mongoose = require("mongoose");

const OrderLigneSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: false,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
      required: false,
    },

    tgc: {
      type:  Number,
      default: 0,
    },
  
    remise: {
      type: Number,
      default: 0
    }
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("OrderLigne", OrderLigneSchema);
