import Globe from "./Globe";
import { getAIJoke } from "@/lib/openai";
import { getTrendingTopics } from "@/lib/twitter";

export default async function Home() {
  const joke = await getAIJoke();
  const topics = await getTrendingTopics(2459115);

  return (
    <main>
      <h1>reportAIge</h1>
      <p>AI generated reportage art.</p>
      <Globe />
    </main>
  );
}
