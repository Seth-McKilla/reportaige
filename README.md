<h1 align="center" font-size="32px">reportAIge</h1>
<p align="center">AI generated art based on trending Twitter topics from around the globe.</p>

![reportaige](https://user-images.githubusercontent.com/63591760/212368720-ac797f7f-7f85-47c9-bbe0-282b0fb112b1.png)


---

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
7. Update the `API-KEY` env var with the randomly generated string
8. Signup for a [Google Cloud Account](https://cloud.google.com/), create a new [Storage Bucket](https://cloud.google.com/storage/docs/creating-buckets#create_a_new_bucket), and create a new [Service Account](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating) with the Storage Object Admin role
9. Update the `GCP_BUCKET_NAME`, `GCP_PROJECT_ID`, `GCP_CLIENT_EMAIL`, and `GCP_PRIVATE_KEY` env vars
10. Create a [MongoDB Atlas database](https://www.mongodb.com/docs/atlas/getting-started/) and update the `MONGODB_URI` env var with the database connection string
11. Start the local development environment
```bash
pnpm dev
```
12. Navigate to `http://localhost:3000`

## Seed the database
Hit the `api/artwork` route with a `POST` request for each city to populate mongoDB and Google Cloud Storage with some data with the following script.
⚠️ Make sure you have completed all the above steps and your local development environment is running before running this ⚠️
```bash
pnpm seed
```
You should be good to go now. Happy coding 😁

## Where is `/api/artwork` route being used?
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

## License
The MIT License.
