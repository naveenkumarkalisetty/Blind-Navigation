import { speakLocal } from "@/services/tts/androidTts";
import { runYoloDetection } from "@/services/vision/yolo";

let lastWarnTime = 0;
const COOLDOWN_MS = 5000;

export async function handleFrame(frame: Uint8Array) {
    const detected = await runYoloDetection(Array.from(frame));

    const now = Date.now();
    if (detected && now - lastWarnTime > COOLDOWN_MS) {
        lastWarnTime = now;
        speakLocal("Vehicle approaching. Please be careful.");
    }
}