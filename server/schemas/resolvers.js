const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Tech, Contribution, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')(process.env.S_KEY);

const resolvers = {

  Query: {
    //find user by id if logged in
    user: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      // If id was passed, find that user, otherwise assume the current user is desired ...
      const userId = args._id || context.user._id;
      if (userId) {
        const user = await User.findById(userId).populate('posts').populate({
          path: 'posts',
          populate: 'tech',
        });
        return user;
      }
    },
    post: async (parent, args) => {
      return await Post.findById(args._id).populate('tech');
    },
    tech: async (parent, args) => {
      return await Tech.findById(args._id).populate('post');
    },

    //find all users
    users: async () => {
      return await User.find({}).populate('posts').populate({
        path: 'posts',
        populate: 'tech'
      });
    },

    //find all techs
    techs: async () => {
      return await Tech.find({}).populate('post');
    },

    //find all posts
    posts: async () => {
      return await Post.find({}).populate('tech');
    },

    // find all contributions
    contributions: async () => {
      return await Contribution.find();
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.contributions',
          populate: 'order'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ contributions: args.contributions });
      const line_items = [];

      const { contributions } = await order.populate('contributions').execPopulate();

      for (let i = 0; i < contributions.length; i++) {
        const contribution = await stripe.contributions.create({
          name: contributions[i].name,
          description: contributions[i].description,
          images: [`${url}/images/${contributions[i].image}`]
        });

        const price = await stripe.prices.create({
          contribution: contribution.id,
          unit_amount: contributions[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
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
    // addPost: async (parent, args, context) => {
    //   if (context.user) {
    //     const updatedUserPost = await User.create(args);
    //     return updatedUserPost;
    //   }
    //   throw new AuthenticationError('App: You need to be logged in!');
    // },
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

    addOrder: async (parent, { contributions}, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ contributions });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateContribution: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Contribution.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
    }
  }
};

module.exports = resolvers;
