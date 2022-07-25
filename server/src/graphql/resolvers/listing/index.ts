import { IDatabase, IListing } from "../../../lib/types";
import { ObjectId } from "mongodb";

export const listingResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: IDatabase }
    ) => {
      return await db.listings.find({}).toArray();
      //  find method allows to find objects in db based on the query, empty object will return all documents
    },
  },

  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: IDatabase }
    ) => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteRes) throw new Error("Deletion failed");
      return deleteRes.value;
    },
  },

  Listing: {
    id: (listing: IListing): string => listing._id.toString(),
  },
};
