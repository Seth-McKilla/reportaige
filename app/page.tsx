import { getAIJoke } from "@/lib/openai";
import { getTrendingTopics } from "@/lib/twitter";

export default async function Home() {
  const joke = await getAIJoke();
  const topics = await getTrendingTopics(2459115);
  console.log(topics);

  return (
    <main>
      <h1 className="grid h-screen text-4xl font-bold text-center text-gray-900 place-items-center">
        {joke}
      </h1>
    </main>
  );
}
