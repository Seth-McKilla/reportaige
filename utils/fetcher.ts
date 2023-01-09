export default async function fetcher(url: string): Promise<any> {
  const res = await fetch(url);
  return await res.json();
}
