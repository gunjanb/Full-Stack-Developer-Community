const {Schema, model} = require("mongoose");

const techSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      posts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Post'
          }
        ]
    }
  );


  const Tech = model("Tech", techSchema);
  module.exports = Tech;
