import cities from "../constants/cities";
import citiesJSON from "../data/cities.json";
import clientPromise from "@/lib/mongodb";
import { fetchCollection } from "@/utils/api";

(async function seedDB() {
  const citiesCollection = await fetchCollection(clientPromise, "cities");
  await citiesCollection.deleteMany({});
  await citiesCollection.insertMany(citiesJSON);

  await Promise.all(
    cities.map(async (city) => {
      try {
        await fetch(
          `http://localhost:3000/api/artwork/${city}?apiKey=${process.env.API_KEY}`,
          {
            method: "POST",
          }
        );
      } catch (error) {
        console.error(error);
      }
    })
  );
})();
