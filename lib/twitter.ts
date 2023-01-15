import Oauth from "oauth";

const twitterApiUrl = "https://api.twitter.com/1.1/";
const twitterUploadUrl = "https://upload.twitter.com/1.1/";

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN!;
const twitterApiKey = process.env.TWITTER_API_KEY!;
const twitterApiKeySecret = process.env.TWITTER_API_KEY_SECRET!;
const twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN!;
const twitterAccessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET!;

const oauth = new Oauth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  twitterApiKey,
  twitterApiKeySecret,
  "1.0A",
  null,
  "HMAC-SHA1"
);

export type Trend = {
  name: string;
  url: string;
  promoted_content: string;
  query: string;
  tweet_volume: number;
};

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

    // Sort by tweet volume and filter out any trends that don't have a tweet volume and limit to 10
    return trends
      .sort((a, b) => b.tweet_volume - a.tweet_volume)
      .filter((trend) => trend.tweet_volume)
      .map(({ name, tweet_volume, url }) => ({
        name,
        tweet_volume,
        url,
      }))
      .slice(0, 9) as Trend[];
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}

export async function sendTweetWithMedia(text: string, image: Blob) {
  try {
    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const body = {
      media_data: base64Image,
    };

    const uploadResponse = (await new Promise((resolve, reject) => {
      oauth.post(
        `${twitterUploadUrl}/media/upload.json?media_category=tweet_image`,
        twitterAccessToken,
        twitterAccessTokenSecret,
        body,
        "application/x-www-form-urlencoded",
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data as string);
          }
        }
      );
    })) as string;

    const uploadData = JSON.parse(uploadResponse);

    if (uploadData.errors) {
      throw new Error(uploadData.errors[0].message);
    }
    const mediaId = uploadData?.media_id_string;

    const tweetResponse = (await new Promise((resolve, reject) => {
      oauth.post(
        `${twitterApiUrl}/statuses/update.json`,
        twitterAccessToken,
        twitterAccessTokenSecret,
        {
          status: text,
          media_ids: mediaId,
        },
        "application/x-www-form-urlencoded",
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data as string);
          }
        }
      );
    })) as string;

    const tweetData = JSON.parse(tweetResponse);

    if (tweetData.errors) {
      throw new Error(tweetData.errors[0].message);
    }

    return tweetData;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}
