// const mongoose = require("mongoose");

// const { Schema, model } = mongoose;
// const bcrypt = require("bcrypt");
// const Order = require("./Order");

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 5,
//   },
//   aboutMe: {
//     type: String,
//     trim: true,
//   },
//   profilePic: {
//     type: String,
//   },
//   contactInfo: {
//     type: String,
//   },
//   posts: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Post",
//     },
//   ],
//   orders: [Order.schema],
// });

// userSchema.pre("save", async function (next) {
//   if (this.isNew || this.isModified("password")) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// const User = model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const Post = require("./Post");
const Tech = require("./Tech");
const Order = require("./Order");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  aboutMe: {
    type: String,
    trim: true,
  },
  profilePic: {
    type: String,
    trim: true,
  },
  contactInfo: {
    type: String,
    trim: true,
  },
  techs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tech",
    },
  ],
  posts: [Post.schema],
  orders: [Order.schema],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
