const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Tech } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {

Query: {

  //find user by id if logged in

    user: async (parent, args, context) => {
    if (context.user) {
      const user = await User.findById(context.user._id).populate('posts').populate({
        path: 'posts',
        populate: 'tech'
      });
      return user
    }
    throw new AuthenticationError("Not logged in");
    },



    post: async (parent, args) => {
      return await Post.findById(args._id).populate('tech');
    },

    tech: async (parent, args) => {
      return await Tech.findById(args._id).populate('user');
    },

    //fina all users
    users: async () => {
      return await User.find({}).populate('posts').populate({
        path: 'posts',
        populate: 'tech'
      });
    },

    //find all techs
    techs: async () => {
      return await Tech.find({}).populate('user');
    },

    //find all posts
    posts: async () => {
      return await Post.find({}).populate('tech');
    }
  },



Mutation: {
  ////////////////////////////////
    addUser: async (parent, args) => {
      const user = await User.create(args);
      if(!user) {
        throw new AuthenticationError("The email already exists; does not create successfully")
      }
      const token = signToken(user);
      return { token, user };
    },

////////////////////////////////
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          args,
          {new: true}
        );
      }
      throw new AuthenticationError("Not logged in");
    },

////////////////////////////////
    addTech: async(parent, {postId, name}) =>{
      if (context.user) {
      const existedTech = await Tech.findOne({name});
      if(existedTech){
        const updatedPost = await Post.findByIdAndUpdate(
        { _id: postId },
        {$push: { tech: existedTech } },
        {new: true}
        )
        return updatedPost}
      else {
        const newTech = await Tech.create({name});
        const newPost = await Post.findByIdAndUpdate(
          { _id: postId },
          {$push: { tech: newTech } },
          {new: true}
          );
          return newPost
      }

    } throw new AuthenticationError('App: You need to be logged in!');
  },


////////////////////////////////
    addPost: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { post: args } },
          { new: true }
        );
        return updatedUser;
      }
        throw new AuthenticationError('App: You need to be logged in!');
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
