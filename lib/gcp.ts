import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  },
});

export async function uploadFile(uploadPath: string, uploadFile: File) {
  try {
    const filename = `${uploadPath}/${uploadFile.name}`;

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);
    const file = bucket.file(filename);
    const options = {
      expires: Date.now() + 1 * 60 * 1000, //  1 minute,
      fields: { "x-goog-meta-test": "data" },
    };

    const [signedPostPolicy] = await file.generateSignedPostPolicyV4(options);

    const response = await fetch(signedPostPolicy.url, {
      method: "POST",
      body: uploadFile,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    return filename;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error);
    return error?.response?.data?.error?.message || error?.message;
  }
}
