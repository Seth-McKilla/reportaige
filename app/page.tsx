import CityOptionsList from "./CityOptionsList";
import Globe from "./Globe";
import cities from "@/data/cities";

export default async function Home() {
  return (
    <main>
      <div className="mt-10 text-center">
        <h1 className="mb-2 text-4xl font-bold">reportAIge</h1>
        <p>
          AI generated reportage art based on current Twitter trends from around
          the world.
        </p>
      </div>
      <Globe cities={cities} />
      <CityOptionsList cities={cities} />
    </main>
  );
}
