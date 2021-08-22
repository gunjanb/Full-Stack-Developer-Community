const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
Query: {
///////////////////////////////
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('post');
        return user
      }
      throw new AuthenticationError("Not logged in");
    },
////////////////////////////////
    all_user: async () => {
      return await User.find({}).populate('post');
    },
////////////////////////////////
    post: async (parent, args, context) => {
      if (context.user) {
        return await Post.find({})
      }
    }
  },




Mutation: {
  ////////////////////////////////
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
////////////////////////////////
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
////////////////////////////////
    addPost: async (parent, args, context) => {
      if (context.user) {
        const updatedUserPost = await User.create(args);
        return updatedUserPost;
      }
      // throw new AuthenticationError('You need to be logged in!');
    },
////////////////////////////////
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { post: { postId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
////////////////////////////////
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
