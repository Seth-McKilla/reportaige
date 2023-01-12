// import Dashboard from "./Dashboard";

export default async function Home() {
  await createArtwork();

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
        {/* <Dashboard artworkByCity={artworkByCity} /> */}
      </div>
    </main>
  );
}

async function createArtwork() {
  await fetch("http://localhost:3000/api/artwork/johannesburg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
