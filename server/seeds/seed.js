const db = require("../config/connection");
const { User, Post, Tech, Product } = require("../models");
const productData = require("./productData.json");

db.once("open", async () => {
  await Tech.deleteMany();

  const techs = await Tech.insertMany([
    { name: " HTML" },
    { name: "JS" },
    { name: "NODE" },
    { name: "REACT" },
    { name: "APOLLO" },
  ]);

  console.log("tech seeded", techs);

  await Post.deleteMany();

  const posts = await Post.insertMany([
    {
      title: "HTML",
      content: "HTML is good to learn",
      video: "not here",
      video_title: "HTML",
    },
    {
      title: "JS",
      content: "JS is good to learn",
      video: "not here",
      video_title: "JS",
    },
    {
      title: "REACT",
      content: "REACT  is good to learn",
      video: "not here",
      video_title: "REACT",
    },
    {
      title: "NODE",
      content: "NODE is good to learn",
      video: "not here",
      video_title: "NODE",
    },
  ]);

  console.log("POST seeded: ", posts);

  const products = await Product.insertMany(productData);

  console.log("products seeded ");

  await User.deleteMany();

  const usertest = await User.create({
    username: "test",
    email: "test@gmail.com",
    password: "password123",
    aboutMe: "I am test",
    profilePic: "not here",
    contactInfo: "t@gmail.com",
    techs: [techs[0]._id, techs[1]._id, techs[2]._id],
    posts: [posts[0], posts[2]],
  });

  await User.create({
    username: "gunjan",
    email: "g@gmail.com",
    password: "password123",
    aboutMe: "I am test",
    profilePic: "not here",
    contactInfo: "g@gmail.com",
    techs: [techs[1]._id, techs[2]._id],
    posts: [posts[1], posts[3]],
  });

  await User.create({
    username: "Rex",
    email: "r@gmail.com",
    password: "password123",
    aboutMe: "I am test",
    profilePic: "not here",
    contactInfo: "r@gmail.com",
    techs: [techs[3]._id, techs[4]._id],
    posts: [posts[2], posts[3]],
  });

  await User.create({
    username: "tiffany",
    email: "t@gmail.com",
    password: "password123",
    aboutMe: "I am test",
    profilePic: "not here",
    contactInfo: "t@gmail.com",
    techs: [techs[1]._id, techs[2]._id],
    posts: [posts[1], posts[4]],
  });

  console.log("users seeded. ", usertest);

  process.exit();
});
