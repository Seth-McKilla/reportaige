import { Configuration, OpenAIApi } from "openai";

import { illustrationStyles } from "@/data/openai";
import type { Artwork } from "@/lib/twitter";
import { getRandomArrayItem, toLowerSpaceCase } from "@/utils/common";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

export default openai;

const formattedTrends = {
  description: "",
  totalTweets: 0,
  imageUrl: "",
};
export type FormattedTrend = Partial<typeof formattedTrends>;

export async function createArtwork(trendsObject: FormattedTrend) {
  try {
    const prompt = `Create a ${getRandomArrayItem(
      illustrationStyles
    )} piece of artwork of the following scene: ${trendsObject.description}`;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    const imageUrl = response.data.data[0].url;

    trendsObject.imageUrl = imageUrl;
    return trendsObject;
  } catch (error: any) {
    console.error(error?.response?.data?.error);
  }
}

export async function createArtworkDescription(artwork: Artwork) {
  const max_tokens = 30;
  const request = `Create a single, complete sentence description in ${max_tokens} characters or less, without profanity, based on as many of the following words / phrases as possible:`;

  const inputWords = artwork.hashtags.reduce((acc, hashtag) => {
    const word = toLowerSpaceCase(hashtag);
    return `${acc}, ${word}`;
  }, "");

  const prompt = `${request} ${inputWords}.`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt} ${artwork.hashtags.join(", ")}.`,
      temperature: 0,
      max_tokens,
    });
    const artworkDescription = response.data.choices[0].text || "";

    return {
      ...artwork,
      description: artworkDescription,
    };
  } catch (error: any) {
    console.error(error?.response?.data?.error);
  }
}
