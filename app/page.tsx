import Dashboard from "./Dashboard";
import { getAllArtwork } from "@/lib/gcp";

export default async function Home() {
  const citiesWithArtwork = await getAllArtwork();

  return (
    <main>
      <div className="px-2 mt-4 text-center sm:my-8">
        <h1 className="text-4xl font-bold sm:mb-4">reportAIge</h1>
        <p>
          AI generated reportage art based on current Twitter trends from around
          the world.
        </p>
      </div>
      <div className="flex justify-center">
        <Dashboard citiesWithArtwork={citiesWithArtwork} />
      </div>
    </main>
  );
}
