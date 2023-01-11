const apiKey = process.env.TWITTER_BEARER_TOKEN!;
const apiUrl = "https://api.twitter.com/1.1/";

export type Trend = {
  name: string;
  url: string;
  promoted_content: string;
  query: string;
  tweet_volume: number;
};

export async function getTrendingTopics(twitterLocationId: number) {
  try {
    const response = await fetch(
      `${apiUrl}/trends/place.json?id=${twitterLocationId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
  } catch (error) {
    console.error(error);
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
