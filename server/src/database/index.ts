import { MongoClient } from "mongodb";
import { IDatabase } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
export const connectDB = async (): Promise<IDatabase> => {
  const client = await MongoClient.connect(url);

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
