import type { NextApiRequest, NextApiResponse } from "next";

import { City } from "@/data/cities";
import {
  createArtwork,
  createArtworkScenesByCity,
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
    const artworkScenesByCity = (await createArtworkScenesByCity()) as Record<
      City,
      FormattedTrend
    >;

    await Promise.all(
      Object.entries(artworkScenesByCity).map(async ([city, trendsObject]) => {
        const imageUrl = await createArtwork(trendsObject);
        return { [city]: { ...trendsObject, imageUrl } };
      })
    );

    return res.status(200).json({
      data: artworkScenesByCity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops! Something went wrong." });
  }
}
