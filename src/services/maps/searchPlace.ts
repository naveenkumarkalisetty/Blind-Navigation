import { AZURE_MAPS_KEY } from "@/config/azure";

export async function searchPlace(query: string) {
  const url =
    `https://atlas.microsoft.com/search/address/json` +
    `?api-version=1.0` +
    `&subscription-key=${AZURE_MAPS_KEY}` +
    `&query=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    console.error("SearchPlace: No results found for", query);
    throw new Error(`No location found for: ${query}`);
  }
  console.log(data.results[0]);
  return data.results[0].position;
}
