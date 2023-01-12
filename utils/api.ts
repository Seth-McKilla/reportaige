import type { Writable } from "stream";

export async function fetchCollection(
  clientPromise: Promise<any>,
  collection: "artwork" | "cities"
) {
  const client = await clientPromise;
  return await client.db("main").collection(collection);
}

export async function bufferStream(buffer: Buffer, stream: Writable) {
  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.end(buffer);
  });
}
