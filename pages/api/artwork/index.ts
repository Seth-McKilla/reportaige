import type { NextApiRequest, NextApiResponse } from "next";

import {
  createArtwork,
  createArtworkScenesByCity,
  type ArtworkScenesByCity,
  type FormattedTrend,
} from "@/lib/openai";

type Data = {
  data?: Record<City, FormattedTrend>;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const artworkByCity =
      (await createArtworkScenesByCity()) as ArtworkScenesByCity;

    await Promise.all(
      Object.entries(artworkByCity).map(async ([city, trendsObject]) => {
        const imageUrl = await createArtwork(trendsObject);
        return { [city]: { ...trendsObject, imageUrl } };
      })
    );

    return res.status(200).json({
      data: artworkByCity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops! Something went wrong." });
  }
}
