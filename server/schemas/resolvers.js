require("dotenv").config();
const { nanoid } = require("nanoid");
const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Tech, Product, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(process.env.S_KEY);
const { GraphQLUpload } = require("graphql-upload");

const AWS = require("aws-sdk");

const awsConfig = {
  
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
  apiVersion: process.env.AWS_API_VERSION,
  correctClockSkew: true,
};

const S3 = new AWS.S3(awsConfig);
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    techs: async () => {
      return await Tech.find();
    },

    users: async () => {
      return await User.find({}).populate("techs").populate("posts");
    },
    user: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      
      const userId = args._id || context.user._id;
      if (userId) {
        const user = await User.findById(userId)
          .populate("techs")
          .populate("posts");
        return user;
      }
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "product",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }
    },
    
    products: async () => {
      return await Product.find();
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "order",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products").execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const { email } = args;
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new AuthenticationError("User already exists");
      }

      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can not find user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Sorry, incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateaboutme: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        })
          .populate("techs")
          .populate("posts");
      }

      throw new AuthenticationError("Not logged in");
    },

    updatecontactinfo: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        })
          .populate("techs")
          .populate("posts");
      }

      throw new AuthenticationError("Not logged in");
    },

    updatetech: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        })
          .populate("techs")
          .populate("posts");
      }

      throw new AuthenticationError("Not logged in");
    },

    updatepost: async (parent, args, context) => {
      if (context.user) {
        const file = await args.file;
        const { createReadStream, filename, mimetype } = file;
        const fileStream = createReadStream();
        const uploadParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: `${nanoid()}`,
          Body: fileStream,
          ACL: "public-read",
          ContentType: file.mimetype,
        };

        const result = await S3.upload(uploadParams).promise();

        const post = new Post({
          title: args.title,
          content: args.content,
          video: result.Location,
          video_title: args.video_title,
        });
        
        const postresponse = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { posts: post } },
          { new: true }
        )
          .populate("posts")
          .populate("techs");

      }

      throw new AuthenticationError("In upload video");
    },

    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    uploadprofilepic: async (parent, args, context) => {
      if (context.user) {
        const file = await args.file;
        const { createReadStream, filename, mimetype } = file;
        const fileStream = createReadStream();
        const uploadParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: `${nanoid()}`,
          Body: fileStream,
          ACL: "public-read",
          ContentType: file.mimetype,
        };

        const result = await S3.upload(uploadParams).promise();

        return await User.findByIdAndUpdate(
          context.user._id,
          { profilePic: result.Location },
          {
            new: true,
          }
        )
          .populate("techs")
          .populate("posts");
      } else throw new AuthenticationError("In upload video");
    },
  },
};

module.exports = resolvers;
