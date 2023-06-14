const mongoose = require("mongoose");
const moment = require("moment")
const CollectSchema = new mongoose.Schema(
  {
    collectPoint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollectPoint",
    },
    remarque: {
      type: String,
      maxlength: [500, "Remarque can not be more than 500 characters"],
      default: "Aucune remarque",
    },
    status: {
      type: String,
      enum: ["todo", "done", "fail"],
      default: "todo",
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    assigned: {
      type: Boolean,
      default: false
    },
    collectDemandeDate: {
      type: Date,
      default: Date.now,
    },
    
    collectDate: {
      type: Date,
    },
    quantityCollected:{
      type: Number
    },
 
    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reverse populate with virtuals
CollectSchema.virtual("certificat", {
  ref: "Certificat",
  localField: "_id",
  foreignField: "collect",
  justOne: true,
});

// ============= CALCULATE THE TOTAL OF RECYCLED FOR A COLLECT POINT

// statics method to get total of collect point recycled
CollectSchema.statics.getTotalRecycled = async function(collectPointId) {
  console.log("calculating total recycled".blue);
  const obj = await this.aggregate([
    {
      $match: {collectPoint : collectPointId}
    },
    {
      $group: {
        _id: '$collectPoint',
        totalRecycled: {$sum: '$quantityCollected'}
        
      }
    }
  ])

  try {
    await this.model('CollectPoint').findByIdAndUpdate(collectPointId, {
      totalRecycled : obj[0].totalRecycled
    })
  } catch (error) {
    console.log(error);
  }
}







// Call getTotalRecycled after save 
CollectSchema.post('save', function() {
      this.constructor.getTotalRecycled(this.collectPoint)
})
// // Call getTotalRecycled after save 
// CollectSchema.pre('save', function() {
//       this.constructor.getTotalRecycled(this.collectPoint)
// })








const Collect = mongoose.model("Collect", CollectSchema);

module.exports = Collect;
