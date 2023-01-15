import type { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import cities from "@/constants/cities";
import { uploadBlob } from "@/lib/gcp";
import clientPromise from "@/lib/mongodb";
import { createArtwork, processTrends } from "@/lib/openai";
import { getTrendingTopics, sendTweetWithMedia } from "@/lib/twitter";
import { fetchCollection } from "@/utils/api";

type Data = {
  data?: Artwork;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { authorization } = req.headers;

  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const city = req.query.city as City;
  if (!city || !cities.includes(city)) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    const citiesCollection = await fetchCollection(clientPromise, "cities");
    const cityInfo = (await citiesCollection.findOne({
      name: city,
    })) as CityInfo & { _id: ObjectId };

    const trendingTopics = await getTrendingTopics(cityInfo.twitterLocationId);
    const { totalTweets, hashtags } = await processTrends(trendingTopics);
    console.log("SUCCESSFULLY_PROCESSED_TRENDS");

    const artworkImageUrl = await createArtwork(hashtags.join(", "));
    console.log("SUCCESSFULLY_CREATED_ARTWORK");

    const response = await fetch(artworkImageUrl);
    const artworkBlob = await response.blob();

    // TODO: Fix error handling of uploadBlob
    // (Currently consoles error but still creates artwork document)

    const imgFilename = `${city}-${Date.now()}.jpeg`;
    await uploadBlob(artworkBlob, imgFilename);
    console.log("SUCCESSFULLY_UPLOADED_ARTWORK");

    const artwork: Artwork = {
      cityId: cityInfo._id,
      imgFilename,
      totalTweets,
      hashtags,
      createdAt: new Date(),
    };
    const artworkCollection = await fetchCollection(clientPromise, "artwork");
    await artworkCollection.insertOne(artwork);
    console.log("SUCCESSFULLY_CREATED_ARTWORK_DOCUMENT");

    if (process.env.NODE_ENV !== "development") {
      await fetch(process.env.VERCEL_DEPLOY_HOOK_URL!, {
        method: "POST",
      });
      console.log("SUCCESSFULLY_REDEPLOYED_SITE");

      await sendTweetWithMedia(
        `🤖 Beep boop, greetings #${city.replace(
          "-",
          ""
        )}. I, a mere machine, created this masterpiece inspired by your current human trends ${hashtags.join(
          " #"
        )}`,
        artworkBlob
      );
    }

    return res.status(201).json({ data: artwork });
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return res
      .status(500)
      .json({ error: error?.response?.data?.error?.message || error?.message });
  }
}
