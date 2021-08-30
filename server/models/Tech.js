const mongoose = require("mongoose");

const { Schema } = mongoose;

const techSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Tech = mongoose.model("Tech", techSchema);

module.exports = Tech;
