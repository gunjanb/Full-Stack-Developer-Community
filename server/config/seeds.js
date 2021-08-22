const db = require("./connection");
const { User, Post } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    username: "pame1234",
    email: "pamela@testmail.com",
    password: "password12345",
    aboutMe: "I am a queen",
    profilePic: "imgurl is here",
    contactInfo: "facebook: n/a"
  });

  await User.create({
    username: "rex12345",
    email: "eholt@testmail.com",
    password: "password12345",
    aboutMe: "I am a queen-2",
    profilePic: "imgurl is here, but not here",
    contactInfo: "facebook: yu19910513"
  });

  await Post.create({
    title: 'rex',
    tech: 'html',
    content: 'no conetent',
    video: 'no video',
    video_title: 'not available'
  })

  console.log("users seeded");

  process.exit();
});
