import { isVisionEnabled } from "@/core/visionState";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

type Props = {
    onFrame: (data: Uint8Array) => void;
};

export function CameraFeed({ onFrame }: Props) {
    const [camera, setCamera] = useState<CameraView | null>(null);
    const [permission, requestPermission] = useCameraPermissions();
    /* 1️⃣ Request permission once */
    useEffect(() => {
        if (!permission) return;
        if (!permission.granted) requestPermission();
    }, [permission]);

    /* 2️⃣ Conditional capture loop */
    useEffect(() => {
        if (!permission?.granted || !camera) return;

        let interval: ReturnType<typeof setInterval> | null = null;

        const warmup = setTimeout(() => {
            interval = setInterval(async () => {
                // 🚫 DO NOT CAPTURE unless navigation is active
                if (!isVisionEnabled()) return;
                try {
                    const photo = await camera.takePictureAsync({
                        base64: true,
                        quality: 0.25,
                        skipProcessing: true,
                    });

                    if (photo?.base64) {
                        const bytes = Uint8Array.from(
                            atob(photo.base64),
                            (c) => c.charCodeAt(0)
                        );
                        onFrame(bytes);
                    }
                } catch (err) {
                    console.warn("Camera frame capture failed:", err);
                }
            }, 2500); // 🐢 capture every 2.5 seconds
        }, 2000); // camera warm-up

        return () => {
            clearTimeout(warmup);
            if (interval) clearInterval(interval);
        };
    }, [permission, camera]);

    if (!permission?.granted) return <View />;
    
    return (
        <CameraView
            ref={(ref) => setCamera(ref)}
            facing="back"
            style={{ width: 1, height: 1 }} // invisible
        />
    );
}
