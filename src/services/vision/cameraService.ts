import { Camera } from "expo-camera";

/**
 * Request camera permissions
 */
export async function requestCameraPermission(): Promise<boolean> {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === "granted";
}

/**
 * Request microphone permissions (often needed for camera/video recording)
 */
export async function requestMicrophonePermission(): Promise<boolean> {
    const { status } = await Camera.requestMicrophonePermissionsAsync();
    return status === "granted";
}

/**
 * Request both permissions
 */
export async function requestVisionPermissions(): Promise<boolean> {
    const camera = await requestCameraPermission();
    return camera;
}
