import { disableVision, enableVision } from "@/core/visionState";
import { fetchRoute } from "@/services/maps/routeService";
import { startListening } from "@/services/stt/androidStt";
import { speakLocal } from "@/services/tts/androidTts";
import { waitUntilClose } from "@/utils/waitUntilClose";
let globalSetStatus: ((text: string) => void) | undefined;

export function startAppFlow(setStatus?: (text: string) => void) {
  if (setStatus) {
    globalSetStatus = setStatus;
  }
  disableVision();
  speakLocal("Where do you want to go?");
  startListening(
    onDestinationSpoken,
    globalSetStatus,
    /* onError */() => {
      // If STT fails (e.g. no speech), wait a bit and restart
      console.log("STT failed, restarting flow...");
      setTimeout(startAppFlow, 1000);
    }
  );
}

async function onDestinationSpoken(destination: string) {
  try {
    speakLocal(`Starting navigation to ${destination}`);
    if (globalSetStatus) globalSetStatus("Navigating...");

    const instructions = await fetchRoute(destination);
    console.log(instructions);
    enableVision();
    for (const step of instructions) {
      speakLocal(step.message);
      await waitUntilClose(step.latitude, step.longitude, 12);
    }

    speakLocal("You have reached your destination");
    if (globalSetStatus) globalSetStatus("Destination reached...");
  } catch (error) {
    console.error("Navigation error:", error);
    speakLocal("Sorry, I couldn't find a route to that destination. Please try again.");
    if (globalSetStatus) globalSetStatus("Error...");
  } finally {
    disableVision();
    setTimeout(startAppFlow, 2000);
  }
}
