const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
      type: String,
      // required: true,
      // trim: true,
    },
    tech: {
      type: String,
      // required: true,
      // trim: true
    },
    content: {
        type: String,
        // required: true
      },
    video: {
        type: String
    },
    video_title: {
        type: String
      }
  });


const Post = mongoose.model("Post", postSchema);
module.exports = Post;
