import { handleFrame } from "@/core/backgroundVision";
import { startAppFlow } from "@/core/navigationFlow";
import { requestPermissions } from "@/core/permissions";
import { CameraFeed } from "@/services/vision/cameraFeed";
import { testYoloModel } from "@/services/vision/yolo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type AppState =
  | "Starting..."
  | "Ready"
  | "Please allow mic and location"
  | "Listening..."
  | "Processing..."
  | "Error..."
  | "Navigating..."
  | "Destination reached...";

const getStateConfig = (state: string) => {
  switch (state) {
    case "Listening...":
      return { color: "#4CAF50", icon: "mic", showPulse: true }; // Green
    case "Processing...":
      return { color: "#2196F3", icon: "sync", showPulse: false }; // Blue
    case "Navigating...":
      return { color: "#2196F3", icon: "navigate", showPulse: false }; // Blue
    case "Error...":
      return { color: "#F44336", icon: "alert-circle", showPulse: false }; // Red
    case "Destination reached...":
      return { color: "#4CAF50", icon: "checkmark-circle", showPulse: false }; // Green
    case "Ready":
      return { color: "#607D8B", icon: "power", showPulse: false }; // Grey
    default:
      return { color: "#607D8B", icon: "mic-off", showPulse: false }; // Grey
  }
};

export default function Index() {
  const [status, setStatus] = useState<string>("Starting...");
  const config = getStateConfig(status);

  // Animation values
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.3);

  useEffect(() => {
    requestPermissions().then(async granted => {
      if (granted) {
        setStatus("Ready");
        await testYoloModel();
        startAppFlow(setStatus);
      } else {
        setStatus("Please allow mic and location");
      }
    });
  }, []);

  useEffect(() => {
    if (config.showPulse) {
      pulseScale.value = withRepeat(withTiming(1.5, { duration: 1000 }), -1, true);
      pulseOpacity.value = withRepeat(withTiming(0, { duration: 1000 }), -1, true);
    } else {
      pulseScale.value = withSpring(1);
      pulseOpacity.value = withTiming(0);
    }
  }, [config.showPulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: config.color }]}>
      <View style={styles.content}>
        {/* Pulse Effect */}
        <Animated.View style={[styles.pulseCircle, animatedStyle]} />

        {/* Main Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name={config.icon as any} size={64} color={config.color} />
        </View>

        <Text style={styles.statusText}>{status}</Text>
        <CameraFeed onFrame={handleFrame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transitionDuration: "0.5s", // Web transition
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  pulseCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statusText: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
