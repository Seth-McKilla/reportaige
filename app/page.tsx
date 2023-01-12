import Dashboard from "./Dashboard";
import { getAllArtwork } from "@/lib/gcp";

export default async function Home() {
  const citiesWithArtwork = await getAllArtwork();
  console.log(citiesWithArtwork);

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
        <Dashboard citiesWithArtwork={citiesWithArtwork} />
      </div>
    </main>
  );
}
