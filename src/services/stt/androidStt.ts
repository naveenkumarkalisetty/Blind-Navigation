import { ExpoSpeechRecognitionModule } from "expo-speech-recognition";

let isListening = false;
let resultSubscription: { remove: () => void } | null = null;
let errorSubscription: { remove: () => void } | null = null;

export async function startListening(
    onFinalText: (text: string) => void,
    setStatus?: (text: string) => void,
    onError?: (error: any) => void
) {
    console.log("STT: startListening called. isListening:", isListening);

    // If already listening, force stop first to ensure clean state
    if (isListening) {
        console.warn("STT: Already listening, stopping first...");
        await stopListening();
    }

    if (setStatus) {
        setStatus("Listening...");
    }

    const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();

    if (!permission.granted) {
        console.warn("STT permission not granted");
        if (setStatus) setStatus("Permission Denied");
        return;
    }

    isListening = true;

    // 🔹 Final results
    resultSubscription = ExpoSpeechRecognitionModule.addListener(
        "result",
        (event: any) => {
            const results = event.results;
            if (results && results?.length > 0) {
                const text = results[0]?.transcript;
                if (text) {
                    if (setStatus) setStatus("Processing....");
                    stopListening();
                    onFinalText(text);
                }
            }
        }
    );

    // 🔹 Errors
    errorSubscription = ExpoSpeechRecognitionModule.addListener(
        "error",
        (event: any) => {
            console.error("STT error:", event.error, event.message);
            if (setStatus) setStatus("Retry..."); // Changed from Error... to Retry...
            stopListening();

            // Invoke the error callback so the flow can restart
            if (onError) {
                onError(event);
            }
        }
    );

    ExpoSpeechRecognitionModule.start({
        lang: "en-IN",
        interimResults: false,
    });
}

export async function stopListening() {
    if (!isListening) return;

    ExpoSpeechRecognitionModule.stop();

    resultSubscription?.remove();
    resultSubscription = null;

    errorSubscription?.remove();
    errorSubscription = null;

    isListening = false;
}
