const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema({
  purchaseName: {
    type: String,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  owe: {
    type: Array,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("purchase", PurchaseSchema);