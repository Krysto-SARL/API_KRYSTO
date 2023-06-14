const mongoose = require("mongoose");

const CertificatSchema = new mongoose.Schema(
  {
    collect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collect",
    },

    recycler: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    destructionDate: {
      type: Date,
      default: Date.now,
    },

    remarque: {
        type: String,
        maxlength: [500, "Remarque can not be more than 500 characters"],
        default: "Aucune remarque",
      },

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
 
);


  
  



module.exports = mongoose.model("Certificat", CertificatSchema);
