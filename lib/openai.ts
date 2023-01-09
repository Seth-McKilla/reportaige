import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

import {
  getAllCitiesTrendingTopics,
  type Trend,
  type TrendingTopicsByCity,
} from "@/lib/twitter";
import { toLowerSpaceCase } from "@/utils/common";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

export default openai;

export function formatTrendsString(trends: Trend[]) {
  const formattedTrends = {
    string: "",
    totalTweets: 0,
  };

  trends.map(({ name, tweet_volume }) => {
    name = toLowerSpaceCase(name);
    formattedTrends.string += `${name}, `;
    formattedTrends.totalTweets += tweet_volume;
  });

  return formattedTrends;
}

export async function createArtworkScenesByCity() {
  try {
    let trendingTopicsByCity: TrendingTopicsByCity;

    if (process.env.NODE_ENV === "development") {
      // Read from local file to avoid hitting Twitter API rate limit
      const trendingTopicsByCityJSON = fs.readFileSync(
        "data/trendingTopicsByCity-example.json",
        "utf8"
      );
      trendingTopicsByCity = JSON.parse(trendingTopicsByCityJSON.toString());
    } else {
      trendingTopicsByCity = await getAllCitiesTrendingTopics();
    }

    const cityArtwork = formatTrendsString(
      trendingTopicsByCity["new-york-city"] as Trend[]
    );

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a single, complete sentence scene in 50 characters or less based on as many of the following words / phrases: ${cityArtwork.string}`,
      temperature: 0,
      max_tokens: 50,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

export async function createArtwork(prompt: string) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
  }
}
