const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  posts: {
    type: Array,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  owe: {
    type: Array,
    required: false
  }
  /*
    Owe: [{
            recipient:
            amount:
            name:
           } 
        ] 
  */
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);