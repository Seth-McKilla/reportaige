import type { NextApiRequest, NextApiResponse } from "next";
import { illustrationStyles } from "@/data/openai";
import openai from "@/lib/openai";
import { getRandomArrayItem } from "@/utils/common";

import { createArtworkScenesByCity } from "@/lib/openai";

type Data = {
  imageUrl?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let prompt = `Create a ${getRandomArrayItem(
      illustrationStyles
    )} piece of artwork of the following scene: `;
    const artworkScene = await createArtworkScenesByCity();
    prompt += artworkScene;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    console.log(response.data.data[0].url);
    return res.status(200).json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops! Something went wrong." });
  }
}
