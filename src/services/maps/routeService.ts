import { AZURE_MAPS_KEY } from "@/config/azure";
import { getCurrentLocation } from "@/services/location/gps";
import { searchPlace } from "./searchPlace";

export async function fetchRoute(destinationText: string) {
  const from = await getCurrentLocation();
  const to = await searchPlace(destinationText);

  const url =
    `https://atlas.microsoft.com/route/directions/json` +
    `?api-version=1.0` +
    `&subscription-key=${AZURE_MAPS_KEY}` +
    `&query=${from.lat},${from.lon}:${to.lat},${to.lon}` +
    `&travelMode=pedestrian` +
    `&guidance=true` +
    `&routeType=shortest` +
    `&instructionsType=text`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.routes || data.routes.length === 0) {
    console.error("FetchRoute: No routes found", data);
    throw new Error("No route found");
  }

  const route = data.routes[0];

  if (!route.guidance || !route.guidance.instructions) {
    console.error("FetchRoute: No guidance/instructions found", JSON.stringify(data, null, 2));
    throw new Error("No guidance instructions found");
  }

  return route.guidance.instructions.map((step: any) => ({
    message: step.message,
    latitude: step.point.latitude,
    longitude: step.point.longitude,
  }));
}
