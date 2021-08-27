const {Schema, model} = require("mongoose");

const techSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      users: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
    }
  );


  const Tech = model("Tech", techSchema);
  module.exports = Tech;
