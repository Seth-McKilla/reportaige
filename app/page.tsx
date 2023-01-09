import fs from "fs";
import Dashboard from "./Dashboard";
import { getAllCitiesTrendingTopics } from "@/lib/twitter";

export default async function Home() {
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
        <Dashboard />
      </div>
    </main>
  );
}
