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
    { name: 'CSS'},
    { name: 'Java'},
    { name: 'C++'},
    { name: 'SQL'}
  ]);

  console.log("tech seeded", techs);

  await Post.deleteMany();

  const posts = await Post.insertMany([
    {
      title: "HTML Tutorial for Beginners ",
      content: "HTML is the language behind every website on the Internet! It's a markup language used to define the structure and content of web pages. It's the first language you need to learn if you want to become a web developer.",
      video: "https://www.youtube.com/watch?v=bWPMSSsVdPk",
      video_title: "HTML Tutorial for Beginners",
    },
    {
      title: "JavaScript Tutorial for Beginners: Learn JavaScript in 5 minutes",
      content: "JavaScript is one of the most popular programming languages in 2019. A lot of people are learning JavaScript to become front-end and/or back-end developers.",
      video: "https://www.youtube.com/watch?v=c-I5S_zTwAc",
      video_title: "JS in 5 minutes",
    },
    {
      title: "Learn React In 5 Minutes",
      content: "In this video I will be covering all of the basics of React in only 30 minutes. We will cover create-react-app, components, state, props, rendering, event handling, and so much more. By the end of this video you will have a full understanding of the basics of React, but if you want to take your React knowledge to the next level checkout my full React course linked above for the best React learning experience on the web.",
      video: "https://www.youtube.com/watch?v=MRIMT0xPXFI",
      video_title: "REACT for beginners",
    },
    {
      title: "Node.js: Tutorial for Beginners",
      content: "NODE is good to learn",
      video: "https://www.youtube.com/watch?v=_h-pj7YqHQw",
      video_title: "NODE course",
    },
    {
      title: "Best Practices for Designing a Federated GraphQL Schema",
      content: "In this talk by Mandi Wise, we learn how to build a GraphQL schema that prioritizes developer ergonomics and how to use observability to make informed choices about evolving it safely. ",
      video: "https://www.youtube.com/watch?v=XQlfX-LnK_A",
      video_title: "Best Practices for Designing a Federated GraphQL Schema",
    },
    {
      title: "Another 5 Must Know CSS Tricks That Almost Nobody Knows",
      content: "CSS is a vast language with tons of features and it is impossible to know them all. In this video I will be covering another 5 features in CSS that nobody knows but are incredibly useful.",
      video: "https://www.youtube.com/watch?v=3T4BsrBISnI",
      video_title: "Another 5 Must Know CSS Tricks That Almost Nobody Knows",
    },
    {
      title: "how we write/review code in big tech companies",
      content: "Writing code is easy. Writing clean code, though, is much harder. In this video I take a look at two different code examples from a beginner, intermediate, and advanced level. The goal of this is to show you how a senior developer will think while programming and how they will structure their code to be as clean and well-written as possible.",
      video: "https://www.youtube.com/watch?v=rR4n-0KYeKQ",
      video_title: "how we write/review code in big tech companies",
    }
  ]);

  console.log("POST seeded: ", posts);

  const products = await Product.insertMany(productData);

  console.log("products seeded ");

  await User.deleteMany();

  const usertest = await User.create({
    username: "Donna",
    email: "donna@gmail.com",
    password: "password123",
    aboutMe: "Currently enrolled in the Full-Stack Web Developer Bootcamp through University of Washington with an interest in backend development.",
    profilePic: "https://avatars.githubusercontent.com/u/78838048?v=4",
    contactInfo: "Github: https://github.com/Donnastjames",
    techs: [techs[0]._id, techs[1]._id, techs[2]._id, techs[6]._id],
    posts: [posts[0], posts[2]],
  });

  await User.create({
    username: "Gunjan",
    email: "g@gmail.com",
    password: "password123",
    aboutMe: "Currently enrolled in a MERN stack web dev boot camp @ UW",
    profilePic: "https://avatars.githubusercontent.com/u/13214814?v=4",
    contactInfo: "Github: https://github.com/gunjanb",
    techs: [techs[0]._id, techs[1]._id, techs[2]._id, techs[5]._id,techs[7]._id],
    posts: [posts[1], posts[3]],
  });

  await User.create({
    username: "Rex",
    email: "r@gmail.com",
    password: "password123",
    aboutMe: "A full-stack web developer with strong planning and troubleshooting skills, especially backend debugging and development.",
    profilePic: "https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/175490637_10209085720297096_6902058411419859689_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=X2IDd_zqNz4AX96zy8x&_nc_ht=scontent-sea1-1.xx&oh=9fb85e54f0157d952a9e455ce9564eb2&oe=614E9281",
    contactInfo: "Github: https://github.com/yu19910513",
    techs: [techs[0]._id, techs[3]._id, techs[4]._id, techs[5]._id, techs[7]._id],
    posts: [posts[6], posts[5]],
  });

  await User.create({
    username: "Tiffany",
    email: "t@gmail.com",
    password: "password123",
    aboutMe: "Living in Washington, when I'm not working, I'm either at the gym, hiking, or sitting in front of a computer learning code.",
    profilePic: "https://avatars.githubusercontent.com/u/79234530?v=4",
    contactInfo: "Github: https://github.com/twashke",
    techs: [techs[0]._id, techs[1]._id, techs[2]._id, techs[4]._id, techs[8]._id],
    posts: [posts[1], posts[4]],
  });

  console.log("users seeded. ", usertest);

  process.exit();
});
