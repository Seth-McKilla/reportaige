<h1 align="center">reportAIge</h1>

<p align="center">AI generated art based on trending Twitter topics from around the globe.</p>

![reportaige](https://user-images.githubusercontent.com/63591760/212368720-ac797f7f-7f85-47c9-bbe0-282b0fb112b1.png)

---

## Table of Contents

1. <a href="#what-is-this"><strong>What is this?</strong></a>
2. <a href="#getting-started"><strong>Getting Started</strong></a>
3. <a href="#seeding-the-database"><strong>Seeding the Database</strong></a>
4. <a href="#where-is-the-artwork-api-route-being-used"><strong>Where is the artwork API route being used?</strong></a>
5. <a href="#example-artwork-api-response"><strong>Example artwork API reponse</strong></a>
6. <a href="#acknowledgements"><strong>Acknowledgements</strong></a>
7. <a href="#license"><strong>License</strong></a>

[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/reportaige.svg?style=social&label=Follow%20%40reportaige)](https://twitter.com/reportaige)

## What is this?

This is a Typescript NextJS app that uses [OpenAI's GPT-3 API](https://openai.com/blog/openai-api/) to generate artwork based on trending Twitter topics from around the globe. The app is hosted on [Vercel](https://vercel.com) and uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the database and [Google Cloud Storage](https://cloud.google.com/storage) for image storage.

The overall process for creating these images is as follows:

1. Fetch the top trending topics for each of the designated [cities](./constants/cities.ts)
2. Generate a single sentence story based on a random trending topics for each city
3. Aggregate the total number of tweets for each each city (to render weight on the globe)
4. Create a piece of artwork using the [DALL-E image generation API](https://openai.com/blog/dall-e/)
5. Rinse and repeat at 12:00pm local time for each city using [Slater](https://tryslater.com) cron jobs

## Getting started

1. Fork and clone the repo to your local development environment.
2. Install the dependencies

```bash
pnpm install
```

3. Rename `.env.example` to `.env`
4. Obtain a [Twitter API key & bearer token](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/api-key-and-secret) and update the `TWITTER_BEARER_TOKEN` env var
5. Sign up for an [OpenAI Account](https://openai.com/api/), obtain an [API key](https://beta.openai.com/account/api-keys) and update the `OPENAI_API_KEY` env var
6. Generate an api key secret

```bash
node
> require('crypto').randomBytes(32).toString('hex')
```

7. Update the `API_SECRET_KEY` env var with the randomly generated string
8. Signup for a [Google Cloud Account](https://cloud.google.com/), create a new [Storage Bucket](https://cloud.google.com/storage/docs/creating-buckets#create_a_new_bucket), and create a new [Service Account](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating) with the Storage Object Admin role
9. Update the `GCP_BUCKET_NAME`, `GCP_PROJECT_ID`, `GCP_CLIENT_EMAIL`, and `GCP_PRIVATE_KEY` env vars
10. Create a [MongoDB Atlas database](https://www.mongodb.com/docs/atlas/getting-started/) and update the `MONGODB_URI` env var with the database connection string
11. Start the local development environment

```bash
pnpm dev
```

12. Navigate to `http://localhost:3000`

## Seeding the database

Hit the `api/artwork` route with a `POST` request for each city to populate mongoDB and Google Cloud Storage with some data with the following script.

⚠️ Make sure you have completed all the above steps and your local development environment is running before running this ⚠️

```bash
pnpm seed
```

You should be good to go now. Happy coding 😁

## Where is the artwork api route being used?

You may have noticed that the api route `/api/artwork` is never called within our NextJS app. This endpoint is hit at 12pm local time for each city using [Slater](https://tryslater.com) cron jobs. Once the api route is hit, a Vercel deploy hook is called to rebuild the application:

```tsx
// pages/api/artwork

...
if (process.env.NODE_ENV !== "development") {
  await fetch(process.env.VERCEL_DEPLOY_HOOK_URL!, {
    method: "POST",
  });
}
...
```

## Example artwork api response

Check out the [example response data](./data/artwork-api-response-example.json) to see an actual example of the `/api/artwork` response data.
The structure is an array of the following objects (one for each city):

```json
{
  "_id": "63befd9ee007932fb0a9ec17",
  "name": "berlin",
  "twitterLocationId": 638242,
  "lat": 52.520008,
  "lng": 13.404954,
  "artwork": {
    "_id": "63bf5c4685b772a8cb284234",
    "cityId": "63befd9ee007932fb0a9ec17",
    "imgFilename": "berlin-1673485382080.jpeg",
    "description": "Jeff Beck protestiert in Southampton für Kelly, Sinan, Rumung, Kohle, Lanz, Klimaterroristen und Luetzerath.",
    "totalTweets": 657522,
    "hashtags": [
      "LOVE YOU ALBA",
      "Jeff Beck",
      "Southampton",
      "Schiff",
      "Luetzerath",
      "Protest",
      "KELLY SAVE OUR NUNS",
      "Sinan",
      "Räumung",
      "Kohle",
      "Lanz",
      "Klimaterroristen",
      "Merz"
    ],
    "createdAt": "2023-01-12T01:03:02.932Z"
  }
}
```

## Acknowledgements

This project was created by Seth.

[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/sethmckilla.svg?style=social&label=Follow%20%40sethmckilla)](https://twitter.com/sethmckilla)

Additional contributors are more than welcome and encouraged!

## License

This project is licensed under the [MIT License](./LICENSE)
