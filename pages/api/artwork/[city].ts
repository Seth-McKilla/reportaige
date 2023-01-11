import type { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { uploadFile } from "@/lib/gcp";
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
    })) as CityInfo & { _id: ObjectId };

    const trendingTopics = await getTrendingTopics(cityInfo.twitterLocationId);
    const { totalTweets, hashtags } = processTrends(trendingTopics);

    const description = await createArtworkDescription(hashtags);
    const artworkImageUrl = await createArtwork(description);

    const response = await fetch(artworkImageUrl);
    const blob = await response.blob();

    const imgFilename = `${city}-${Date.now()}.jpeg`;
    const file = new File([blob], imgFilename, {
      type: "image/jpeg",
    });

    await uploadFile(file);

    const artwork: Artwork = {
      cityId: cityInfo._id,
      imgFilename,
      description,
      totalTweets,
      hashtags,
      isActive: true,
      createdAt: new Date(),
    };
    const artworkCollection = await fetchCollection(clientPromise, "artwork");
    await artworkCollection.insertOne(artwork);

    return res.status(201).json({ artwork });
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return res
      .status(500)
      .json({ error: error?.response?.data?.error?.message || error?.message });
  }
}
