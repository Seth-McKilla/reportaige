import Artwork from "./Artwork";
import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import cities from "@/data/cities";

export default async function Home() {
  return (
    <main>
      <div className="mt-10 mb-20 text-center">
        <h1 className="mb-4 text-4xl font-bold">reportAIge</h1>
        <p>
          AI generated reportage art based on current Twitter trends from around
          the world.
        </p>
      </div>
      <div className="flex">
        <Globe cities={cities} />
        <Artwork />
      </div>
      <CityOptionsList cities={cities} />
    </main>
  );
}
