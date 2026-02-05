import { NativeModules } from "react-native";

type VisionModuleType = {
    testModel(): Promise<string>;
    runDetection(frame: number[]): Promise<string>;
};

const { VisionModule } = NativeModules as {
    VisionModule: VisionModuleType;
};


if (!VisionModule) {
    console.error('Vision Module is NULL');
}
/**
 * Test if YOLO TFLite model loads correctly
 */
export async function testYoloModel(): Promise<void> {
    try {
        console.log(NativeModules.VisionModule);
        const res = await VisionModule.testModel();
        console.log("YOLO TEST:", res);
    } catch (err) {
        console.error("YOLO TEST FAILED:", err);
        throw err;
    }
}

/**
 * Run YOLO inference on a frame (placeholder for now)
 */
export async function runYoloDetection(
    frame: number[]
): Promise<boolean> {
    try {
        await VisionModule.runDetection(frame);
        return true;
    } catch (err) {
        console.error("YOLO detection failed:", err);
        return false;
    }
}
