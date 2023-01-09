import type { NextApiRequest, NextApiResponse } from "next";

import { createArtwork, createArtworkScenesByCity } from "@/lib/openai";

type Data = {
  imageUrl?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const imageUrl = await createArtwork(
      "A picture of an orange tabby cat laying asleep on a white blanket."
    );
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops! Something went wrong." });
  }
}
