import { cities, type City } from "@/data/cities";

const apiKey = process.env.TWITTER_BEARER_TOKEN!;
const apiUrl = "https://api.twitter.com/1.1/";

export type Trend = {
  name: string;
  url: string;
  promoted_content: string;
  query: string;
  tweet_volume: number;
};

export async function getSingleCityTrendingTopics(locationId: number) {
  try {
    const response = await fetch(
      `${apiUrl}/trends/place.json?id=${locationId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const data = await response.json();
    const trends: Trend[] = data?.[0]?.trends;

    if (!trends) {
      throw new Error("No trends found");
    }

    // Sort by tweet volume and filter out any trends that don't have a tweet volume
    return trends
      .sort((a, b) => b.tweet_volume - a.tweet_volume)
      .filter((trend) => trend.tweet_volume)
      .map(({ name, tweet_volume, url }) => ({
        name,
        tweet_volume,
        url,
      })) as Trend[];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCitiesTrendingTopics() {
  const trendingTopicsByCity = {} as Record<City, Trend[] | undefined>;
  await Promise.all(
    cities.map(async (city) => {
      const trendingTopics = await getSingleCityTrendingTopics(city.id);
      trendingTopicsByCity[city.name] = trendingTopics;
    })
  );
  return trendingTopicsByCity;
}
export type TrendingTopicsByCity = Awaited<
  ReturnType<typeof getAllCitiesTrendingTopics>
>;
