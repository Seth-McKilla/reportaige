import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  },
});

export async function uploadFile(file: File): Promise<void> {
  try {
    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);
    const gcpFile = bucket.file(file.name);
    const options = {
      expires: Date.now() + 1 * 60 * 1000, //  1 minute,
      fields: { "x-goog-meta-test": "data" },
    };

    const [signedPolicy] = await gcpFile.generateSignedPostPolicyV4(options);

    const response = await fetch(signedPolicy.url, {
      method: "POST",
      body: file,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}
