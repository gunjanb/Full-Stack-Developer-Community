// const {Schema, model} = require("mongoose");

// const postSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     content: {
//         type: String,
//         required: true
//       },
//     video: {
//         type: String
//     },
//     video_title: {
//         type: String
//     },
//     tech: {
//       type: Schema.Types.ObjectId,
//       ref: 'Tech'
//     }
//   }
// );

// const Post = model("Post", postSchema);
// module.exports = Post;

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
