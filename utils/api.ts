export const fetchCollection = async (
  clientPromise: Promise<any>,
  collection: "artwork" | "cities"
) => {
  const client = await clientPromise;
  return await client.db("main").collection(collection);
};
