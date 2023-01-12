import clientPromise from "@/lib/mongodb";
import { fetchCollection } from "@/utils/api";

export async function getAllArtwork(): Promise<CityWithArtwork[]> {
  const citiesCollection = await fetchCollection(clientPromise, "cities");
  const citiesWithArtwork = await citiesCollection
    .aggregate([
      {
        $lookup: {
          from: "artwork",
          let: { cityId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$cityId", "$$cityId"] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ],
          as: "artwork",
        },
      },
      { $unwind: "$artwork" },
    ])
    .toArray();

  return JSON.parse(JSON.stringify(citiesWithArtwork));
}
