import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";
import { createArtwork, createArtworkDescription } from "@/lib/openai";
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
      throw new Error("Failed to fetch trending topics");
    }

    const { totalTweets, hashtags } = processTrends(trendingTopics);
    if (!totalTweets || !hashtags) {
      throw new Error("Failed to process trends");
    }

    const artworkDescription = await createArtworkDescription(hashtags);
    if (!artworkDescription) {
      throw new Error("Failed to create artwork description");
    }

    const artworkImageUrl = await createArtwork(artworkDescription);
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return res
      .status(500)
      .json({ error: error?.response?.data?.error?.message || error?.message });
  }
}
