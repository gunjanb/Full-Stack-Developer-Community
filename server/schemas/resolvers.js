const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      console.log("Getting users");
      return await User.find({});
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("post");
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },

    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params);
    },

    post: async (parent, { postId } ) => {
      return Post.findOne({ _id: postId });
    },
  },


Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },

    addPost: async (parent, args, context) => {

    },

    deletePost: async (parent, args, context) => {
      if (context.post) {
        return await Post.findByIdAndModify(context.post._id, args, {
          remove: true,
        })
      }
    },

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
