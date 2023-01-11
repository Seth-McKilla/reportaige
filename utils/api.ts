export async function fetchCollection(
  clientPromise: Promise<any>,
  collection: "artwork" | "cities"
) {
  const client = await clientPromise;
  return await client.db("main").collection(collection);
}
