import openai from "@/lib/openai";

export default async function Home() {
  const joke = await getAIJoke();

  return (
    <main>
      <h1 className="text-4xl font-bold text-center text-gray-900 h-screen place-items-center grid">
        {joke}
      </h1>
    </main>
  );
}

async function getAIJoke() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Tell me a joke.",
    temperature: 0,
    max_tokens: 50,
  });
  return response.data.choices[0].text;
}
