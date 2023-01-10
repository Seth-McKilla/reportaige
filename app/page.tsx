import Dashboard from "./Dashboard";
import type { ArtworkScenesByCity } from "@/lib/openai";

export default async function Home() {
  const artworkByCity = await getArtworkByCity();

  return (
    <main>
      <div className="my-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">reportAIge</h1>
        <p>
          AI generated reportage art based on current Twitter trends from around
          the world.
        </p>
      </div>
      <div className="flex justify-center h-full">
        <Dashboard artworkByCity={artworkByCity} />
      </div>
    </main>
  );
}

async function getArtworkByCity() {
  const response = await fetch(`${process.env.APP_URL!}/api/openai/artwork`, {
    next: {
      revalidate: 24 * 60 * 60, // 24 hours
    },
  });
  const { data } = await response.json();
  return data as ArtworkScenesByCity;
}
