import cities from "../constants/cities";

(async function seedDB() {
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
