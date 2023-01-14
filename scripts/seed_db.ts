import cities from "../constants/cities";
import citiesJSON from "../data/cities.json";
import clientPromise from "@/lib/mongodb";
import { fetchCollection } from "@/utils/api";

(async function seedDB() {
  console.log("Seeding DB...");
  const citiesCollection = await fetchCollection(clientPromise, "cities");
  await citiesCollection.deleteMany({});
  await citiesCollection.insertMany(citiesJSON);
  console.log("Seeded cities!");

  await Promise.all(
    cities.map(async (city) => {
      try {
        await fetch(`http://localhost:3000/api/artwork/${city}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        });
        console.log(`Seeded ${city} artwork!`);
      } catch (error) {
        console.error(error);
      }
    })
  );
  console.log("Done seeding DB!");
})();
