import { Storage } from "@google-cloud/storage";

import { bufferStream } from "@/utils/api";

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
