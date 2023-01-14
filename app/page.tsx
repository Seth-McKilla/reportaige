import Dashboard from "./Dashboard";
import Footer from "./Footer";
import TwitterFollowButton from "./TwitterFollowButton";
import { getAllArtwork } from "@/lib/gcp";

export default async function Home() {
  const citiesWithArtwork = await getAllArtwork();

  return (
    <main>
      <div className="px-2 mt-4 text-center sm:my-8">
        <div className="flex flex-col items-center justify-center sm:mb-4">
          <h1 className="mb-2 text-4xl font-bold">reportAIge</h1>
          <TwitterFollowButton username="reportaige" size={20} />
        </div>
        <p>
          AI generated reportage art based on current Twitter trends from around
          the world.
        </p>
      </div>
      <div className="flex justify-center">
        <Dashboard citiesWithArtwork={citiesWithArtwork} />
      </div>
      <Footer />
    </main>
  );
}
