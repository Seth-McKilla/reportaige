import clientPromise from "@/lib/mongodb";
import { fetchCollection } from "@/utils/api";

export async function getAllArtwork() {
  const artworkCollection = await fetchCollection(clientPromise, "artwork");
  return await artworkCollection
    .aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$cityId", artwork: { $first: "$$ROOT" } } },
      {
        $lookup: {
          from: "cities",
          localField: "artwork.cityId",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: "$city" },
    ])
    .toArray();
}
