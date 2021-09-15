# Full Stack Web Developer Community
![MIT license badge](https://img.shields.io/badge/license-MIT-green)

## Description

Welcome to the [Full Stack Developer Community](https://fullstackdevelopercommunity.herokuapp.com/) where web developers can come together to learn, or contribute to the web developement community! Whether you are new to web development, or are an experienced web developer, this site allows the user the ability to **Login** or **Sign Up** to create their own posts, or view other developers posts by technology. Once logged in the user can use their **Dashboard** to upload a profile picture, enter information about themselves and post their own content (including videos). From the **Home** page they can view all of the avaialble technologies and choose one to view the content for that technology. There is a **Donate** page for members to financially contribute to the [Full Stack Developer Community](https://fullstackdevelopercommunity.herokuapp.com/) and the web developers who use it.

## Table of Contents
- [About the Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## About the Project

- This application was designed to be mobile friendly and was designed utilizing the MERN stack with [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [React](https://reactjs.org/) and [Node.js](https://nodejs.org/en/).
- This application relied on [aws-sdk](https://www.npmjs.com/package/aws-sdk) and [graphql-upload](https://www.npmjs.com/package/graphql-upload) to upload videos.
- To view the videos, [react-player](https://www.npmjs.com/package/react-player) was utilized.
- Global State was handled using [redux](https://www.npmjs.com/package/redux).
- The contribution page utilized [stripe](https://www.npmjs.com/package/stripe) to allow the user to donate.
- The [Full Stack Developer Community](https://fullstackdevelopercommunity.herokuapp.com/) allows a user to **Signup** or **Login** to contribute to the web developement community.
- The **Home** page allows a user to view all available technologies, when the click the button, it will bring up all developers who have posted content relating to that technology.
- Once a developer is chosen, they can view their **Profile** page and the developer's posted content.
- The **Dashboard** allows the user to input a profile picture and information about themselves as well as upload content.
- The **Donate!** section allows the user to contribute to the **Full Stack Developer Community** with a donation.

- The **client** folder utilizes the following technologies:

  - [react](https://www.npmjs.com/package/create-react-app)
  - [react-player](https://www.npmjs.com/package/react-player)
  - [redux](https://www.npmjs.com/package/redux)
  - [stripe](https://www.npmjs.com/package/@stripe/stripe-js)
  - [@apollo/client](https://www.npmjs.com/package/apollo-client)
  - [graphQL](https://www.npmjs.com/package/graphql)
  - [Font Awesome Regular Icons](https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons)
  - [Font Awesome Brand Icons](https://www.npmjs.com/package/@fortawesome/free-regular-svg-icons)
  - [Font Awesome Solid Icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)
  - [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
  - [bootsrap](https://getbootstrap.com/)
  - [Favicon Generator](https://favicon.io/)
  - [HTML](https://www.w3schools.com/html/), [CSS](https://www.w3.org/Style/CSS/Overview.en.html), and [Javascript](https://www.javascript.com/)
  - [Node.js](https://nodejs.org/en/)

- The **server** folder utilizes the following technologies:

  - [express](https://www.npmjs.com/package/express)
  - [apollo-express-server](https://www.npmjs.com/package/apollo-server-express)
  - [aws-sdk](https://www.npmjs.com/package/aws-sdk)
  - [nanoid](https://www.npmjs.com/package/nanoid)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [graphql](https://www.npmjs.com/package/graphql)
  - [graphql-upload](https://www.npmjs.com/package/graphql-upload)
  - [jwt-decode](https://www.npmjs.com/package/jwt-decode)
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [stripe](https://www.npmjs.com/package/stripe)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [MongoDB](https://www.mongodb.com/)
  - [Node.js](https://nodejs.org/en/)

- For [Website Deployment](https://fullstackdevelopercommunity.herokuapp.com/) the following technologies were used:

  - [Heroku](https://heroku.com/)
  - [MongoDB Atlas](https://www.mongodb.com/)
  - [if-env](https://www.npmjs.com/package/if-env)

## Installation

- Open [Full Stack Developer Community](https://github.com/twashke/Full-Stack-Developer-Community).
- Use the command line to **git clone**
- **npm install**
- **npm run seed**
- **npm run develop** from command line to connect to server and client.
- Go to [localhost:3000](http://localhost:3000/) for client and [localhost:3001/graphql](http://localhost:3001/graphql) for the server while in development.

## Usage

- Go to [Deployed Full Stack Developer Community](https://fullstackdevelopercommunity.herokuapp.com/).
- **Login** or **Signup** to add, or edit your user profile using the **Dashboard**.
- Use the **Home** page to view all available technologies.
- Once a technology is chosen, the developers with content are displayed.
- Choose a **Developer** to view their profile page and view their content.
- Go to the **Donate** page to contribute to the **Full Stack Developer Community**.

 **Signup** Mobile View 
 
 ![Signup Mobile](client/src/assets/signup-mobile.jpeg)

 **Login** Mobile View 
 
 ![Login Mobile](client/src/assets/login-mobile.jpeg)

 **Home** page view 
 
 ![Home](client/src/assets/home.png)

 **Home** Page - Technologies and Developers 

 ![Home](client/src/assets/home-page-gif.gif)

 **Donate** to the Full Stack Developer Community 
 
 ![Donate](client/src/assets/donate-gif.gif)

 **Add Post** to the Resources Section 

 ![Add Post](client/src/assets/add-post-gif.gif)

## Contributors

- [Gunjan Bhargava](https://github.com/gunjanb)
- [Donna Crawford](https://github.com/Donnastjames)
- [Rex Yu](https://github.com/yu19910513)
- [Tiffany Washke](https://github.com/twashke)

## Tests

- Used Graphql Playground for queries and mutations
- Tested once deployed to [Heroku](https://fullstackdevelopercommunity.herokuapp.com/)

## License
This application is covered by the [MIT License](https://opensource.org/licenses/MIT).


## Questions

If you have any questions about project you can contact contributors by email or by visiting their github profile.

### Gunjan Bhargava

- Email : gunjanbhargava2021@gmail.com
- GitHub: [Gunjan Bhargava](https://github.com/gunjanb)

### Donna Crawford

- Email : crawford0774@gmail.com
- GitHub:[Donnastjames](https://github.com/Donnastjames)

### Rex Yu

- Email : yu19910513@gmail.com
- GitHub: [yu19910513](https://github.com/yu19910513)

### Tiffany Washke

- Email: twashke@gmail.com
- GitHub: [Tiffany Washke](https://github.com/twashke)

