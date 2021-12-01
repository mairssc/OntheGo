const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  post: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("post", PostSchema);