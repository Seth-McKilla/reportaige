import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

import type { City } from "@/data/cities";
import { illustrationStyles } from "@/data/openai";
import {
  getAllCitiesTrendingTopics,
  type Trend,
  type TrendingTopicsByCity,
} from "@/lib/twitter";
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
  } catch (error) {
    console.error(error);
  }
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

    const artworkScenesByCity = {} as Record<City, FormattedTrend>;

    for (const city in trendingTopicsByCity) {
      const trendsString = formatTrendsString(
        trendingTopicsByCity[city as City] as Trend[]
      );

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create a single, complete sentence scene in 30 characters or less based on as many of the following words / phrases: ${trendsString.description}`,
        temperature: 0,
        max_tokens: 30,
      });
      const artworkScene = response.data.choices[0].text;

      artworkScenesByCity[city as City] = {
        description: artworkScene,
      };
    }

    return artworkScenesByCity;
  } catch (error) {
    console.error(error);
  }
}

export function formatTrendsString(trends: Trend[]) {
  const trendsObject = { ...formattedTrends };

  trends.map(({ name, tweet_volume }) => {
    name = toLowerSpaceCase(name);
    trendsObject.description += `${name}, `;
    trendsObject.totalTweets += tweet_volume;
  });

  return trendsObject;
}
