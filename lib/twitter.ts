import { Client } from "twitter-api-sdk";

const twitterApiUrl = "https://api.twitter.com/1.1/";
const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN!;
const twitter = new Client(twitterBearerToken);

export type Trend = {
  name: string;
  url: string;
  promoted_content: string;
  query: string;
  tweet_volume: number;
};

// v1.1 API so cannot use the twitter-api-sdk
export async function getTrendingTopics(
  twitterLocationId: number
): Promise<Trend[]> {
  try {
    const response = await fetch(
      `${twitterApiUrl}/trends/place.json?id=${twitterLocationId}`,
      {
        headers: {
          Authorization: `Bearer ${twitterBearerToken}`,
        },
      }
    );
    const data = await response.json();
    const trends = data?.[0]?.trends as Trend[];

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
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}

export function processTrends(trends: Trend[]) {
  let totalTweets = 0;
  let hashtags: string[] = [];

  trends.forEach((trend) => {
    if (trend.tweet_volume) totalTweets += trend.tweet_volume;
    hashtags.push(trend.name.replace("#", ""));
  });

  return {
    totalTweets,
    hashtags,
  };
}
