# Navigation Assistant for the Visually Impaired

**A smart navigation aid powered by AI to ensure safe and independent travel for blind and visually impaired users.**

> **Note**: This project is currently in active development.

[Download App (Placeholder)](APK Link Will be Updated Soon)

---

## 📖 About The Project

This application is designed to act as a digital guide dog, using computer vision and voice interaction to help blind users navigate their environment safely.

It leverages **YOLO (You Only Look Once)** object detection to identify obstacles, potholes, and traffic signals in real-time, providing immediate audio feedback to the user. The app works completely offline for core features to ensure reliability.

### Key Features
-   **Real-time Object Detection**: Uses a TFLite implementation of YOLOv8 to detect vehicles, people, obstacles, and path boundaries.
-   **Voice Guidance**: Full Text-to-Speech (TTS) integrations to describe the environment (e.g., "Car approaching on left", "Clear path ahead").
-   **Voice Commands**: Speech-to-Text (STT) interface allowing users to set destinations and control the app via voice.
-   **Turn-by-Turn Navigation**: Integrated routing to guide users from point A to point B.

## 🔄 Application Flow

1.  **User Input**: The user activates the app and speaks their destination using the voice command interface (`src/services/stt`).
2.  **Route Planning**: The app calculates a pedestrian-safe route using navigation services.
3.  **Vision Loop**:
    -   The camera captures video frames in the background (`src/services/vision/cameraFeed`).
    -   Frames are processed by the **YOLOv8** Native Module (`src/services/vision/yolo.ts`).
    -   The system identifies objects and calculates their distance/danger level.
4.  **Feedback**:
    -   If an obstacle is detected, the app immediately alerts the user via TTS.
    -   Directional cues are provided to keep the user on the correct path.

## 📂 Project Structure

The codebase is organized as follows:

```
Navigation/
├── android/            # Native Android code (includes VisionModule & YOLO Detector)
├── src/
│   ├── app/            # UI Screens and File-based routing (Expo Router)
│   ├── services/       # Core device services
│   │   ├── vision/     # Camera handling and YOLO detection logic
│   │   ├── stt/        # Speech-to-Text (Voice input)
│   │   └── tts/        # Text-to-Speech (Audio output)
│   ├── core/           # Main application logic and navigation loops
│   ├── store/          # State management (Zustand)
│   └── utils/          # Helper functions
└── package.json
```

## ⚙️ Configuration

### EAS Project ID
Before building, you must link the app to your Expo account:
1.  Open `app.json`.
2.  Find the `expo.extra.eas.projectId` field.
3.  Replace the existing ID with your own Project ID.
    *   You can generate a new ID by running `eas init`.

## ☁️ EAS Build setup

To build the app using Expo Application Services (EAS):

1.  **Install EAS CLI**
    ```bash
    npm install -g eas-cli
    ```

2.  **Login to Expo**
    ```bash
    eas login
    ```

3.  **Configure the Project**
    ```bash
    eas build:configure
    ```

4.  **Creating a Build**
    *   **Development Build** (for testing on device):
        ```bash
        eas build --profile development --platform android
        ```
    *   **Production Build** (for release):
        ```bash
        eas build --profile production --platform android
        ```

## 🛠 Installation

Follow these steps to set up the development environment.

### Prerequisites
-   [Node.js](https://nodejs.org/) (LTS)
-   [Android Studio](https://developer.android.com/studio) (for Android Emulator/SDK)
-   Physical Android Device (Recommended for testing Camera/ML performance)

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/navigation-app.git
    cd Navigation
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Prepare Native Build**
    This project uses custom native code for computer vision. You must perform a prebuild or run android build.
    ```bash
    npx expo prebuild
    ```

## 🚀 Running the App

Since this app uses native modules (C++/Kotlin for YOLO), you cannot run it in the standard "Expo Go" client. You must build the development client.

### Android
To build and run on a connected device or emulator:

```bash
npx expo run:android
```

*This command compiles the native code (including the Vision Module) and installs the app on your device.*

## 🤝 Contributing

Contributions are welcome to make navigation safer for everyone. Please see `CONTRIBUTING.md` for details.

## 📄 License

Distributed under the MIT License.
