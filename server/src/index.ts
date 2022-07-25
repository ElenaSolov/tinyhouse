//we should introduce the library first to avoid warnings of running code before the import of other files and to prevent compilation errors
require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDB } from "./database";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const db = await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }), //place db object to context to be able to access it from all graphql resolvers
  });

  // Required logic for integrating with Express
  await server.start();

  const app = express();

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/api",
  });

  // Modified server startup
  app.listen(process.env.PORT);
  console.log(process.env);
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
}

startApolloServer(typeDefs, resolvers).catch((err) => console.log(err));
