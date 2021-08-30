const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
  },
  video: {
    type: String,
    trim: true,
  },
  video_title: {
    type: String,
    trim: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
