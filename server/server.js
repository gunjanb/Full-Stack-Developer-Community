require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { graphqlUploadExpress } = require("graphql-upload");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

async function startServer() {
  db.once("open", () => {
    console.log("Connected To MongoDB Successfully");
  });

  const server = new ApolloServer({
    uploads: false,
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();
  const app = express();
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  await new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}

startServer();
