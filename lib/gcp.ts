import { Storage } from "@google-cloud/storage";

import clientPromise from "@/lib/mongodb";
import { bufferStream, fetchCollection } from "@/utils/api";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  },
});
const bucketName = process.env.GCP_BUCKET_NAME!;

export async function uploadBlob(blob: Blob, imgFilename: string) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(imgFilename);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = file.createWriteStream({
      metadata: {
        contentType: blob.type,
      },
    });

    await bufferStream(buffer, stream);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllArtwork(): Promise<CityWithArtwork[]> {
  const citiesCollection = await fetchCollection(clientPromise, "cities");
  const citiesWithArtworkJSON = await citiesCollection
    .aggregate([
      {
        $lookup: {
          from: "artwork",
          let: { cityId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$cityId", "$$cityId"] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ],
          as: "artwork",
        },
      },
      { $unwind: "$artwork" },
    ])
    .toArray();

  const citiesWithArtwork = JSON.parse(JSON.stringify(citiesWithArtworkJSON));

  const bucket = storage.bucket(bucketName);
  return await Promise.all(
    citiesWithArtwork.map(async (cityWithArtwork: CityWithArtwork) => {
      const file = bucket.file(cityWithArtwork.artwork.imgFilename);
      const [signedURL] = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2500",
      });
      cityWithArtwork.artwork.imgFilename = signedURL;
      return cityWithArtwork;
    })
  );
}
