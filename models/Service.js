const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Aucun nom"],
    },
    detail: {
      type: String,
      required: [true, "Aucune déscription"],
      maxlength: [500, "Name can not be more than 500 characters"],
      default: "aucune description",
    },
    moreDetail: {
      type: String,
      required: [true, "Aucune déscription"],
      maxlength: [500, "Name can not be more than 500 characters"],
      default: "aucune description",
    },
    durationHour: {
      type: Number,
    },
    unitPrice: {
      type: Number,
    },

    photo: {
      type: String,
      default: "no-photo.png",
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
