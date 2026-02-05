import * as Speech from "expo-speech";

export function speakLocal(text: string) {
    console.log("Local TTS:", text);

    Speech.stop(); // stop any previous speech

    Speech.speak(text, {
        language: "en-IN",
        rate: 0.9,      // slower for clarity
        pitch: 1.0,
    });
}