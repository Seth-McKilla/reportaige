import { Configuration, OpenAIApi } from "openai";

import illustrationStyles from "@/constants/illustrationStyles";
import type { Trend } from "@/lib/twitter";
import {
  getRandomArrayItem,
  toLowerSpaceCase,
  removeSpaces,
} from "@/utils/common";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

export async function createArtwork(hashtagsString: string): Promise<string> {
  try {
    const prompt = `Create a ${getRandomArrayItem(
      illustrationStyles
    )} type piece of a scene based on the following topics: ${hashtagsString}`;

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

export async function processTrends(trends: Trend[]) {
  try {
    let totalTweets = 0;
    let hashtags: string[] = [];

    trends.forEach((trend) => {
      if (trend.tweet_volume) totalTweets += trend.tweet_volume;
      hashtags.push(trend.name.replace("#", ""));
    });

    const hashtagsString = hashtags.reduce((acc, hashtag) => {
      const word = toLowerSpaceCase(hashtag);
      return `${acc}, ${word}`;
    }, "");

    const prompt = `Remove any inappropriate words or phrases from the following list of words and phrases: ${hashtagsString}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 25,
    });
    const description = response.data.choices[0].text || "";

    hashtags = description
      .split(",")
      .map((hashtag) => {
        return `${removeSpaces(hashtag)}`;
      })
      .filter((hashtag) => hashtag.length > 0);

    return {
      totalTweets,
      hashtags,
    };
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}
