import { Configuration, OpenAIApi } from "openai";

import { illustrationStyles } from "@/data/openai";
import { getRandomArrayItem, toLowerSpaceCase } from "@/utils/common";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

export async function createArtworkDescription(
  hashtags: Artwork["hashtags"]
): Promise<string> {
  const max_tokens = 50;
  const request = `Create a single, complete sentence story in ${max_tokens} characters or less, using five randomly chosen words or phrases from the following list: `;

  const inputWords = hashtags.reduce((acc, hashtag) => {
    const word = toLowerSpaceCase(hashtag);
    return `${acc}, ${word}`;
  }, "");

  // Moderation categories according to: https://beta.openai.com/docs/api-reference/moderations
  const disclaimer =
    ". The story should not include any of the following categories: hate, hate/threatening, self-harm, sexual, sexual/minors, violence, violence/graphic, or similar.";

  const prompt = request + inputWords + disclaimer;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens,
    });
    const description = response.data.choices[0].text || "";
    return description.trim();
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}

export async function createArtwork(
  artworkDescription: Artwork["description"]
): Promise<string> {
  try {
    const prompt = `Create a ${getRandomArrayItem(
      illustrationStyles
    )} type piece of artwork of the following scene. ${artworkDescription}`;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    return response.data.data[0].url || "";
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}
