const apiKey = process.env.TWITTER_BEARER_TOKEN!;
const apiUrl = "https://api.twitter.com/1.1/";

export async function getTrendingTopics(locationId: number) {
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
    const trends = data?.[0]?.trends;

    // sort by tweet volume
    trends.sort(
      (a: { tweet_volume: number }, b: { tweet_volume: number }) =>
        b.tweet_volume - a.tweet_volume
    );

    // filter out trends with no tweet volume
    const filteredTrends = trends.filter(
      (trend: { tweet_volume: number }) => trend.tweet_volume
    );

    // return trends with only name and tweet volume and url
    return filteredTrends.map(
      ({
        name,
        tweet_volume,
        url,
      }: {
        name: string;
        tweet_volume: number;
        url: string;
      }) => ({
        name,
        tweet_volume,
        url,
      })
    );
  } catch (error) {
    console.error(error);
  }
}
