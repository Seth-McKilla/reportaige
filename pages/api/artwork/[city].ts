import type { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { uploadBlob } from "@/lib/gcp";
import clientPromise from "@/lib/mongodb";
import { createArtwork, createArtworkDescription } from "@/lib/openai";
import { getTrendingTopics, processTrends } from "@/lib/twitter";
import { fetchCollection } from "@/utils/api";

type Data = {
  data?: Artwork;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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

    // TODO: Fix error handling of uploadBlob
    // (Currently consoles error but still creates artwork document)

    const imgFilename = `${city}-${Date.now()}.jpeg`;
    await uploadBlob(blob, imgFilename);

    const artwork: Artwork = {
      cityId: cityInfo._id,
      imgFilename,
      description,
      totalTweets,
      hashtags,
      createdAt: new Date(),
    };
    const artworkCollection = await fetchCollection(clientPromise, "artwork");
    await artworkCollection.insertOne(artwork);

    // TODO: Fire off a tweet of the location, description and artwork image
    // (Create another lib for this)

    return res.status(201).json({ data: artwork });
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return res
      .status(500)
      .json({ error: error?.response?.data?.error?.message || error?.message });
  }
}
