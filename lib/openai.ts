import { Configuration, OpenAIApi } from "openai";

import { illustrationStyles } from "@/data/openai";
import { getRandomArrayItem, toLowerSpaceCase } from "@/utils/common";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

export async function createArtworkDescription(hashtags: Artwork["hashtags"]) {
  const max_tokens = 30;
  const request = `Create a single, complete sentence description in ${max_tokens} characters or less, without profanity, based on as many of the following words / phrases as possible:`;

  const inputWords = hashtags.reduce((acc, hashtag) => {
    const word = toLowerSpaceCase(hashtag);
    return `${acc}, ${word}`;
  }, "");

  const prompt = `${request} ${inputWords}.`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt} ${hashtags.join(", ")}.`,
      temperature: 0,
      max_tokens,
    });
    return response.data.choices[0].text || "";
  } catch (error: any) {
    console.error(error?.response?.data?.error);
    return "";
  }
}

export async function createArtwork(
  artworkDescription: Artwork["description"]
) {
  try {
    const prompt = `Create a ${getRandomArrayItem(
      illustrationStyles
    )} piece of artwork of the following scene: ${artworkDescription}`;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    return response.data.data[0].url || "";
  } catch (error: any) {
    console.error(error?.response?.data?.error);
    return "";
  }
}
