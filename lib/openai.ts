import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

export default openai;

export async function getAIJoke() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Tell me a joke.",
    temperature: 0,
    max_tokens: 50,
  });
  return response.data.choices[0].text;
}
