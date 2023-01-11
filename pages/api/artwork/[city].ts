import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";
import { createArtworkDescription } from "@/lib/openai";
import { getTrendingTopics, processTrends } from "@/lib/twitter";
import { fetchCollection } from "@/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const city = req.query.city as City;
  if (!city) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    const citiesCollection = await fetchCollection(clientPromise, "cities");
    const cityInfo = (await citiesCollection.findOne({
      name: city,
    })) as CityInfo;

    const trendingTopics = await getTrendingTopics(cityInfo.twitterLocationId);

    if (!trendingTopics) {
      return res.status(404).json({ error: "No trending topics found" });
    }

    const { totalTweets, hashtags } = processTrends(trendingTopics);
    const artworkDescription = await createArtworkDescription(hashtags);
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return res.status(500).json({ error: "Oops! Something went wrong." });
  }
}
